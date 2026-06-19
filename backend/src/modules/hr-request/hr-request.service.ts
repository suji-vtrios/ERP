import { Injectable } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateHrRequestDto } from './dto/create-hr-request.dto';
import { UpdateHrRequestDto } from './dto/update-hr-request.dto';

@Injectable()
export class HrRequestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: CreateHrRequestDto) {
  // Get employee

    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: dto.employeeId,
        },
        include: {
          designation: true,
        },
      });

    if (!employee) {
      throw new Error('Employee not found');
    }

    // Get request type + workflow

    const requestType =
      await this.prisma.hrRequestType.findUnique({
        where: {
          id: dto.requestTypeId,
        },
        include: {
          workflow: true,
        },
      });

    if (!requestType) {
      throw new Error('Request Type not found');
    }

    if (!requestType.workflowId) {
      throw new Error(
        'Workflow not configured for request type',
      );
    }

    // Create HR Request

    const request =
      await this.prisma.hrRequest.create({
        data: {
          requestNo: `REQ-${Date.now()}`,
          employeeId: dto.employeeId,
          requestTypeId: dto.requestTypeId,
          remarks: dto.remarks,
          status: 'PENDING_APPROVAL',
        },
      });

    // Create Approval Transaction

    const transaction =
      await this.prisma.approvalTransaction.create({
        data: {
          workflowId: requestType.workflowId,
          entityType: 'HR_REQUEST',
          entityId: request.id,
          requestedById: employee.id,
        },
      });

    // Get Workflow Steps

    const workflowSteps =
      await this.prisma.approvalWorkflowStep.findMany({
        where: {
          workflowId: requestType.workflowId,
        },
        orderBy: {
          stepNo: 'asc',
        },
      });


    // Create Transaction Steps

    for (const step of workflowSteps) {
      let approverId: string | null = null;

      // Reporting Manager

      if (
        step.approverType ===
        'REPORTING_MANAGER'
      ) {
        approverId =
          employee.managerId ?? null;
      }

      // Role Based

      
      if (
        step.approverType === 'ROLE' &&
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

      const createdStep =
        await this.prisma.approvalTransactionStep.create({
          data: {
            transactionId: transaction.id,
            stepNo: step.stepNo,
            approverId,
          },
        });


    }

    // Link Request to Transaction

    await this.prisma.hrRequest.update({
      where: {
        id: request.id,
      },
      data: {
        approvalTransactionId:
          transaction.id,
      },
    });

    await this.auditService.log(
      'HrRequest',
      request.id,
      'CREATE',
      null,
      request,
    );

    return {
      request,
      transaction,
    };
  }

  async findAll() {
    return this.prisma.hrRequest.findMany({
      include: {
        employee: true,
        requestType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}