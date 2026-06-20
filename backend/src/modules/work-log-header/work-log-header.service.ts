import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateWorkLogHeaderDto } from './dto/create-work-log-header.dto';
import { UpdateWorkLogHeaderDto } from './dto/update-work-log-header.dto';

@Injectable()
export class WorkLogHeaderService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateWorkLogHeaderDto,
    ) {
    const employee =
        await this.prisma.employee.findUnique({
        where: {
            id: dto.employeeId,
        },
        });

    if (!employee) {
        throw new NotFoundException(
        'Employee not found',
        );
    }

    const existing =
        await this.prisma.workLogHeader.findFirst({
        where: {
            employeeId: dto.employeeId,
            startDate: new Date(dto.startDate),
            endDate: new Date(dto.endDate),
        },
        });

    if (existing) {
        throw new ConflictException(
        'Work log already exists for this period',
        );
    }

    return this.prisma.workLogHeader.create({
        data: {
        employeeId: dto.employeeId,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        remarks: dto.remarks,
        },
    });
    }

  async findAllByEmployee(
    employeeId: string,
    ) {
    return this.prisma.workLogHeader.findMany({
        where: {
        employeeId,
        },
        include: {
        employee: true,
        },
        orderBy: {
        startDate: 'desc',
        },
    });
    }

  async findById(id: string) {
    const workLog =
        await this.prisma.workLogHeader.findUnique({
        where: { id },
        include: {
            employee: true,
            lines: true,
        },
        });

    if (!workLog) {
        throw new NotFoundException(
        'Work log not found',
        );
    }

    return workLog;
    }

  async update(
    id: string,
    dto: UpdateWorkLogHeaderDto,
    ) {
    const workLog =
        await this.findById(id);

    if (workLog.status !== 'DRAFT') {
        throw new ConflictException(
        'Only draft work logs can be updated',
        );
    }

    return this.prisma.workLogHeader.update({
        where: { id },
        data: {
        ...dto,
        startDate: dto.startDate
            ? new Date(dto.startDate)
            : undefined,
        endDate: dto.endDate
            ? new Date(dto.endDate)
            : undefined,
        },
    });
    }

  async submit(
    id: string,
    ) {
    const workLog =
        await this.findById(id);

    if (workLog.status !== 'DRAFT') {
        throw new ConflictException(
        'Only draft work logs can be submitted',
        );
    }

    if (!workLog.lines.length) {
        throw new ConflictException(
        'Timesheet contains no work log lines',
        );
    }

    if (
        Number(workLog.totalHours) <= 0
    ) {
        throw new ConflictException(
        'Timesheet total hours must be greater than zero',
        );
    }

    const workflow =
        await this.prisma.approvalWorkflow.findFirst({
        where: {
            workflowCode:
            'TIMESHEET_APPROVAL',
            isActive: true,
        },
        });

    if (!workflow) {
        throw new NotFoundException(
        'TIMESHEET_APPROVAL workflow not found',
        );
    }

    const transaction =
        await this.prisma.approvalTransaction.create({
        data: {
            workflowId: workflow.id,
            entityType:
            'WORK_LOG_HEADER',
            entityId: workLog.id,
            requestedById:
            workLog.employeeId,
        },
        });

    const workflowSteps =
        await this.prisma.approvalWorkflowStep.findMany({
        where: {
            workflowId: workflow.id,
        },
        orderBy: {
            stepNo: 'asc',
        },
        });

    for (const step of workflowSteps) {
        let approverId: string | null =
        null;

        if (
        step.approverType ===
        'REPORTING_MANAGER'
        ) {
        const employee =
            await this.prisma.employee.findUnique({
            where: {
                id: workLog.employeeId,
            },
            });

        approverId =
            employee?.managerId ??
            null;
        }

        if (
        step.approverType ===
            'ROLE' &&
        step.approverRole
        ) {
        const approver =
            await this.prisma.employee.findFirst({
            where: {
                designation: {
                designationName:
                    step.approverRole,
                },
                isActive: true,
            },
            });

        approverId =
            approver?.id ?? null;
        }

        await this.prisma.approvalTransactionStep.create({
        data: {
            transactionId:
            transaction.id,
            stepNo: step.stepNo,
            approverId,
        },
        });
    }

    const updatedWorkLog =
        await this.prisma.workLogHeader.update({
        where: {
            id,
        },
        data: {
            status: 'SUBMITTED',
            submittedAt: new Date(),
            approvalTransactionId:
            transaction.id,
        },
        });

    return updatedWorkLog;
    }

  async remove(id: string) {
    const workLog =
        await this.findById(id);

    if (workLog.status !== 'DRAFT') {
        throw new ConflictException(
        'Only draft work logs can be deleted',
        );
    }

    return this.prisma.workLogHeader.delete({
        where: { id },
    });
    }

    async recalculateTotalHours(
        workLogHeaderId: string,
        ) {
        const lines =
            await this.prisma.workLogLine.findMany({
            where: {
                workLogHeaderId,
            },
            select: {
                hours: true,
            },
            });

        const totalHours = lines.reduce(
            (sum, line) =>
                sum + parseFloat(line.hours.toString()),
            0,
            );

        await this.prisma.workLogHeader.update({
            where: {
            id: workLogHeaderId,
            },
            data: {
            totalHours,
            },
        });

        return totalHours;
        }

}