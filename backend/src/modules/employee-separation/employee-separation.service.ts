import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { Prisma } from '@prisma/client';

import { CreateEmployeeSeparationDto } from './dto/create-employee-separation.dto';
import { SeparationFilterDto } from './dto/separation-filter.dto';
import { ProcessSeparationDto } from './dto/process-separation.dto';
import { CompleteSeparationDto } from './dto/complete-separation.dto';

@Injectable()
export class EmployeeSeparationService {
    constructor(
        private readonly prisma: PrismaService,
        ) {}

    async create(
        dto: CreateEmployeeSeparationDto,
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

        const existing =
            await this.prisma.employeeSeparation.findFirst({
            where: {
                employeeId: dto.employeeId,
                status: {
                in: [
                    'SUBMITTED',
                    'APPROVED',
                ],
                },
            },
            });

        if (existing) {
            throw new BadRequestException(
            'Active separation request already exists',
            );
        }

        const separation =
            await this.prisma.employeeSeparation.create({
                data: {
                employeeId: dto.employeeId,
                separationType: dto.separationType,
                resignationDate: dto.resignationDate
                    ? new Date(dto.resignationDate)
                    : null,
                lastWorkingDate: dto.lastWorkingDate
                    ? new Date(dto.lastWorkingDate)
                    : null,
                reason: dto.reason,
                },
            });
        const workflow =
            await this.prisma.approvalWorkflow.findFirst({
                where: {
                workflowCode: 'EMPLOYEE_SEPARATION',
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
            return separation;
            }

        const transaction =
            await this.prisma.approvalTransaction.create({
                data: {
                workflowId: workflow.id,
                entityType: 'EMPLOYEE_SEPARATION',
                entityId: separation.id,
                requestedById: separation.employeeId,
                currentStep: 1,
                status: 'PENDING',
                },
            });

        for (const workflowStep of workflow.steps) {

            let approverId: string | null = null;

            if (
                workflowStep.approverType ===
                'REPORTING_MANAGER'
            ) {
                approverId =
                employee.managerId ?? null;
            }

            if (
                workflowStep.approverType === 'ROLE' &&
                workflowStep.approverRole
            ) {
                const approver =
                await this.prisma.employee.findFirst({
                    where: {
                    companyId: employee.companyId,
                    designation: {
                        designationName:
                        workflowStep.approverRole,
                    },
                    isActive: true,
                    },
                });

                approverId =
                approver?.id ?? null;
            }

            await this.prisma.approvalTransactionStep.create({
                data: {
                transactionId: transaction.id,
                stepNo: workflowStep.stepNo,
                approverId,
                status: 'PENDING',
                },
            });
        }

        await this.prisma.employeeSeparation.update({
            where: {
                id: separation.id,
            },
            data: {
                approvalTransactionId: transaction.id,
            },
            });
        return this.findOne(separation.id);
        }

    async findAll(
        filters: SeparationFilterDto,
        ) {
        const where:
            Prisma.EmployeeSeparationWhereInput =
            {};

        if (filters.employeeId) {
            where.employeeId =
            filters.employeeId;
        }

        if (filters.status) {
            where.status =
            filters.status.toUpperCase();
        }

        if (filters.separationType) {
            where.separationType =
            filters.separationType.toUpperCase();
        }

        return this.prisma.employeeSeparation.findMany({
            where,
            include: {
            employee: true,
            },
            orderBy: {
            createdAt: 'desc',
            },
        });
        }

    async findOne(id: string) {
        const separation =
            await this.prisma.employeeSeparation.findUnique({
            where: { id },
            include: {
                employee: true,
            },
            });

        if (!separation) {
            throw new NotFoundException(
            'Separation request not found',
            );
        }

        return separation;
        }

    async process(
        dto: ProcessSeparationDto,
        ) {
        const transaction =
            await this.prisma.approvalTransaction.findUnique({
            where: {
                id: dto.transactionId,
            },
            });

        if (!transaction) {
            throw new NotFoundException(
            'Transaction not found',
            );
        }

        const currentStep =
            await this.prisma.approvalTransactionStep.findFirst({
            where: {
                transactionId: transaction.id,
                stepNo: transaction.currentStep,
            },
            });

        if (!currentStep) {
            throw new NotFoundException(
            'Approval step not found',
            );
        }

        if (
            currentStep.approverId !== dto.approverId
        ) {
            throw new BadRequestException(
            'Invalid approver',
            );
        }

        await this.prisma.approvalTransactionStep.update({
            where: {
            id: currentStep.id,
            },
            data: {
            action: dto.action,
            remarks: dto.remarks,
            actionDate: new Date(),
            status: dto.action,
            },
        });

        if (dto.action === 'REJECTED') {
            await this.prisma.approvalTransaction.update({
            where: {
                id: transaction.id,
            },
            data: {
                status: 'REJECTED',
            },
            });

            await this.prisma.employeeSeparation.update({
            where: {
                id: transaction.entityId,
            },
            data: {
                status: 'REJECTED',
            },
            });

            return {
            message:
                'Separation request rejected',
            };
        }

        const nextStep =
            await this.prisma.approvalTransactionStep.findFirst({
            where: {
                transactionId: transaction.id,
                stepNo: transaction.currentStep + 1,
            },
            });

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
            message:
                'Moved to next approval step',
            };
        }

        await this.prisma.approvalTransaction.update({
            where: {
            id: transaction.id,
            },
            data: {
            status: 'APPROVED',
            },
        });

        await this.prisma.employeeSeparation.update({
            where: {
            id: transaction.entityId,
            },
            data: {
            status: 'APPROVED',
            },
        });

        return {
            message:
            'Separation request approved',
        };
        }

    async complete(
        dto: CompleteSeparationDto,
        ) {
        const separation =
            await this.prisma.employeeSeparation.findUnique({
            where: {
                id: dto.separationId,
            },
            });

        if (!separation) {
            throw new NotFoundException(
            'Separation request not found',
            );
        }

        if (
            separation.status !== 'APPROVED'
        ) {
            throw new BadRequestException(
            'Only approved separations can be completed',
            );
        }

        await this.prisma.employee.update({
            where: {
            id: separation.employeeId,
            },
            data: {
            employmentStatus: 'RESIGNED',
            isActive: false,
            },
        });

        await this.prisma.employeeSeparation.update({
            where: {
            id: separation.id,
            },
            data: {
            status: 'COMPLETED',
            completedById:
                dto.completedById,
            completedDate:
                new Date(),
            clearanceRemarks:
                dto.clearanceRemarks,
            },
        });

        return {
            message:
            'Employee separation completed successfully',
        };
        }
}
