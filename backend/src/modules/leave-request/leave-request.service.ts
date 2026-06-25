import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { Prisma } from '@prisma/client';

import { CreateLeaveRequestDto } from './dto/create-leave-request.dto';
import { UpdateLeaveRequestDto } from './dto/update-leave-request.dto';
import { LeaveRequestFilterDto } from './dto/leave-request-filter.dto';
import { ProcessLeaveRequestDto } from './dto/process-leave-request.dto';

@Injectable()
export class LeaveRequestService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateLeaveRequestDto,
  ) {
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: dto.employeeId,
        },
      });

    if (!employee) {
      throw new BadRequestException(
        'Employee not found',
      );
    }

    const leaveType =
      await this.prisma.leaveType.findUnique({
        where: {
          id: dto.leaveTypeId,
        },
      });

    if (!leaveType) {
      throw new BadRequestException(
        'Leave type not found',
      );
    }

    const fromDate = new Date(dto.fromDate);
    const toDate = new Date(dto.toDate);

    if (fromDate > toDate) {
      throw new BadRequestException(
        'From date cannot be greater than to date',
      );
    }

    const overlap =
        await this.prisma.leaveRequest.findFirst({
            where: {
            employeeId: dto.employeeId,
            isActive: true,
            status: {
                in: [
                    'DRAFT',
                    'SUBMITTED',
                    'PENDING',
                    'APPROVED',
                ],
                },
            AND: [
                {
                fromDate: {
                    lte: toDate,
                },
                },
                {
                toDate: {
                    gte: fromDate,
                },
                },
            ],
            },
        });

        if (overlap) {
        throw new BadRequestException(
            'Overlapping leave request exists',
        );
        }

    const requestedDays =
      dto.isHalfDay
        ? 0.5
        : Math.floor(
            (
              toDate.getTime() -
              fromDate.getTime()
            ) /
              (1000 * 60 * 60 * 24),
          ) + 1;

    return this.prisma.leaveRequest.create({
      data: {
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        fromDate,
        toDate,
        requestedDays,
        isHalfDay: dto.isHalfDay ?? false,
        reason: dto.reason,
        attachmentUrl: dto.attachmentUrl,
        status: 'DRAFT',
      },
    });
  }

  async findAll(
    filters: LeaveRequestFilterDto,
  ) {
    const where: Prisma.LeaveRequestWhereInput =
      {};

    if (filters.employeeId) {
      where.employeeId =
        filters.employeeId;
    }

    if (filters.leaveTypeId) {
      where.leaveTypeId =
        filters.leaveTypeId;
    }

    if (filters.status) {
      where.status =
        filters.status.toUpperCase();
    }

    return this.prisma.leaveRequest.findMany({
      where,
      include: {
        employee: true,
        leaveType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const request =
      await this.prisma.leaveRequest.findUnique({
        where: { id },
        include: {
          employee: true,
          leaveType: true,
        },
      });

    if (!request) {
      throw new NotFoundException(
        'Leave request not found',
      );
    }

    return request;
  }

  async update(
    id: string,
    dto: UpdateLeaveRequestDto,
    ) {
    const request =
        await this.findOne(id);

    if (
        request.status === 'CANCELLED'
        ) {
        throw new BadRequestException(
            'Leave request already cancelled',
        );
        }

    if (
        ['APPROVED', 'REJECTED', 'CANCELLED']
        .includes(request.status)
    ) {
        throw new BadRequestException(
        'Leave request cannot be modified',
        );
    }

    return this.prisma.leaveRequest.update({
        where: { id },
        data: dto,
    });
    }

  async remove(id: string) {
    const request =
      await this.findOne(id);

    if (
      request.status === 'APPROVED'
    ) {
      throw new BadRequestException(
        'Approved leave cannot be deleted',
      );
    }

    if (
        request.leaveBalanceId &&
        ['SUBMITTED', 'PENDING'].includes(request.status)
        ) {
        await this.prisma.employeeLeaveBalance.update({
            where: {
            id: request.leaveBalanceId,
            },
            data: {
            pending: {
                decrement: Number(request.requestedDays),
            },
            balance: {
                increment: Number(request.requestedDays),
            },
            },
        });
        }


    return this.prisma.leaveRequest.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        isActive: false,
        },
    });
  }

  async submit(id: string) {
    const request =
        await this.findOne(id);

    if (request.status !== 'DRAFT') {
        throw new BadRequestException(
        'Only draft requests can be submitted',
        );
    }

    const employee =
        await this.prisma.employee.findUnique({
        where: {
            id: request.employeeId,
        },
        });

    if (!employee) {
        throw new BadRequestException(
        'Employee not found',
        );
    }

    const year =
        request.fromDate.getFullYear();

    const leaveBalance =
        await this.prisma.employeeLeaveBalance.findFirst({
        where: {
            employeeId: request.employeeId,
            leaveTypeId: request.leaveTypeId,
            year,
            isActive: true,
        },
        });

    if (!leaveBalance) {
        throw new BadRequestException(
        'Leave balance not found',
        );
    }

    const requestedDays = Number(
        request.requestedDays,
        );

        const availableBalance = Number(
        leaveBalance.balance,
        );

        if (availableBalance < requestedDays) {
        throw new BadRequestException(
            'Insufficient leave balance',
        );
        }

        await this.prisma.employeeLeaveBalance.update({
        where: {
            id: leaveBalance.id,
        },
        data: {
            pending: {
            increment: requestedDays,
            },
            balance: {
            decrement: requestedDays,
            },
        },
        });

        const workflow =
            await this.prisma.approvalWorkflow.findFirst({
                where: {
                workflowCode: 'LEAVE_APPROVAL',
                isActive: true,
                },
                include: {
                steps: {
                    orderBy: {
                    stepNo: 'asc',
                    },
                },
                },
            });

            if (!workflow) {
            throw new BadRequestException(
                'Leave approval workflow not found',
            );
            }
        const transaction =
            await this.prisma.approvalTransaction.create({
                data: {
                workflowId: workflow.id,
                entityType: 'LEAVE_REQUEST',
                entityId: request.id,
                requestedById: request.employeeId,
                currentStep: 1,
                status: 'PENDING',
                },
            });

            for (const step of workflow.steps) {
                let approverId: string | null = null;

                if (step.approverType === 'REPORTING_MANAGER') {
                    approverId = employee.managerId;
                }

                if (
                    step.approverType === 'ROLE' &&
                    step.approverRole
                ) {
                    const approver =
                    await this.prisma.employee.findFirst({
                        where: {
                        companyId: employee.companyId,
                        designation: {
                            designationName:
                            step.approverRole,
                        },
                        isActive: true,
                        },
                    });

                    approverId = approver?.id ?? null;
                }

                await this.prisma.approvalTransactionStep.create({
                    data: {
                    transactionId: transaction.id,
                    stepNo: step.stepNo,
                    approverId,
                    status: 'PENDING',
                    },
                });
                }
            
        const updatedRequest =
        await this.prisma.leaveRequest.update({
            where: {
            id,
            },
            data: {
            status: 'PENDING',
                approvalTransactionId:
                transaction.id,
                leaveBalanceId:
                leaveBalance.id,
            },
        });

        return updatedRequest;
    }

    async approve(
        id: string,
        dto: ProcessLeaveRequestDto,
        ) {
        const request =
            await this.prisma.leaveRequest.findUnique({
            where: { id },
            include: {
                approvalTransaction: {
                include: {
                    approvalSteps: {
                    orderBy: {
                        stepNo: 'asc',
                    },
                    },
                },
                },
                leaveBalance: true,
            },
            });

        if (!request) {
            throw new NotFoundException(
            'Leave request not found',
            );
        }

        if (request.status !== 'PENDING') {
            throw new BadRequestException(
                'Only pending requests can be approved',
            );
            }

        if (!request.approvalTransaction) {
            throw new BadRequestException(
            'Approval transaction not found',
            );
        }

        const transaction =
            request.approvalTransaction;

        const currentStep =
            transaction.approvalSteps.find(
            step =>
                step.stepNo ===
                transaction.currentStep,
            );

        if (!currentStep) {
            throw new BadRequestException(
            'Current approval step not found',
            );
        }

        await this.prisma.approvalTransactionStep.update({
            where: {
            id: currentStep.id,
            },
            data: {
            status: 'APPROVED',
            action: 'APPROVED',
            remarks: dto.remarks,
            actionDate: new Date(),
            },
        });

        const nextStep =
            transaction.approvalSteps.find(
            step =>
                step.stepNo ===
                transaction.currentStep + 1,
            );

        if (nextStep) {
            await this.prisma.approvalTransaction.update({
            where: {
                id: transaction.id,
            },
            data: {
                currentStep:
                transaction.currentStep + 1,
            },
            });

            return {
            success: true,
            message:
                'Moved to next approval step',
            };
        }

        await this.prisma.employeeLeaveBalance.update({
            where: {
            id: request.leaveBalanceId!,
            },
            data: {
            pending: {
                decrement: Number(
                request.requestedDays,
                ),
            },
            used: {
                increment: Number(
                request.requestedDays,
                ),
            },
            },
        });

        await this.prisma.approvalTransaction.update({
            where: {
            id: transaction.id,
            },
            data: {
            status: 'APPROVED',
            currentStep:
                transaction.approvalSteps.length,
            },
        });

        const updatedRequest =
            await this.prisma.leaveRequest.update({
            where: {
                id,
            },
            data: {
                status: 'APPROVED',
                approvedDays:
                request.requestedDays,
            },
            });

        return updatedRequest;
        }

        async reject(
            id: string,
            dto: ProcessLeaveRequestDto,
            ) {
            const request =
                await this.prisma.leaveRequest.findUnique({
                where: { id },
                include: {
                    approvalTransaction: {
                    include: {
                        approvalSteps: {
                        orderBy: {
                            stepNo: 'asc',
                        },
                        },
                    },
                    },
                    leaveBalance: true,
                },
                });

            if (!request) {
                throw new NotFoundException(
                'Leave request not found',
                );
            }

            if (request.status !== 'PENDING') {
                throw new BadRequestException(
                'Only pending requests can be rejected',
                );
            }

            if (!request.approvalTransaction) {
                throw new BadRequestException(
                'Approval transaction not found',
                );
            }

            const transaction =
                request.approvalTransaction;

            const currentStep =
                transaction.approvalSteps.find(
                step =>
                    step.stepNo ===
                    transaction.currentStep,
                );
                

            if (!currentStep) {
                throw new BadRequestException(
                'Current approval step not found',
                );
            }

            if (!currentStep.approverId) {
                throw new BadRequestException(
                    'Approver not assigned',
                );
                }

            await this.prisma.approvalTransactionStep.update({
                where: {
                id: currentStep.id,
                },
                data: {
                status: 'REJECTED',
                action: 'REJECTED',
                remarks: dto.remarks,
                actionDate: new Date(),
                },
            });

            await this.prisma.approvalTransaction.update({
                where: {
                id: transaction.id,
                },
                data: {
                status: 'REJECTED',
                currentStep: transaction.currentStep,
                },
            });

            if (request.leaveBalanceId) {
                await this.prisma.employeeLeaveBalance.update({
                where: {
                    id: request.leaveBalanceId,
                },
                data: {
                    pending: {
                    decrement: Number(
                        request.requestedDays,
                    ),
                    },
                    balance: {
                    increment: Number(
                        request.requestedDays,
                    ),
                    },
                },
                });
            }

            const updatedRequest =
                await this.prisma.leaveRequest.update({
                where: {
                    id,
                },
                data: {
                    status: 'REJECTED',
                },
                });

            return updatedRequest;
            }

    async getPendingApprovals(
        approverId: string,
        ) {
        const transactions =
            await this.prisma.approvalTransaction.findMany({
            where: {
                status: 'PENDING',
            },
            include: {
                workflow: true,
                requestedBy: true,
                approvalSteps: {
                orderBy: {
                    stepNo: 'asc',
                },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            });

        return transactions.filter(
            transaction => {
            const currentStep =
                transaction.approvalSteps.find(
                step =>
                    step.stepNo ===
                    transaction.currentStep,
                );

            return (
                currentStep?.approverId ===
                approverId &&
                currentStep.status === 'PENDING'
            );
            },
        );
        }
}