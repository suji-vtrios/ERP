import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
  from '../../prisma/prisma.service';

import { AuditService }
  from '../audit/audit.service';

import { CreateApprovalWorkflowStepDto }
  from './dto/create-approval-workflow-step.dto';

import { UpdateApprovalWorkflowStepDto }
  from './dto/update-approval-workflow-step.dto';

@Injectable()
export class ApprovalWorkflowStepService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(
    dto: CreateApprovalWorkflowStepDto,
  ) {
    const step =
      await this.prisma.approvalWorkflowStep.create({
        data: dto,
      });

    await this.auditService.log(
      'ApprovalWorkflowStep',
      step.id,
      'CREATE',
      null,
      step,
    );

    return step;
  }

  async findAll() {
    return this.prisma.approvalWorkflowStep.findMany({
      include: {
        workflow: true,
      },
      orderBy: [
        {
          workflowId: 'asc',
        },
        {
          stepNo: 'asc',
        },
      ],
    });
  }

  async findOne(id: string) {
    const step =
      await this.prisma.approvalWorkflowStep.findUnique({
        where: { id },
        include: {
          workflow: true,
        },
      });

    if (!step) {
      throw new NotFoundException(
        'Workflow Step not found',
      );
    }

    return step;
  }

  async update(
    id: string,
    dto: UpdateApprovalWorkflowStepDto,
  ) {
    await this.findOne(id);

    const updated =
      await this.prisma.approvalWorkflowStep.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'ApprovalWorkflowStep',
      id,
      'UPDATE',
      null,
      updated,
    );

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.approvalWorkflowStep.delete({
      where: { id },
    });
  }
}