import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
  from '../../prisma/prisma.service';

import { AuditService }
  from '../audit/audit.service';

import { CreateApprovalWorkflowDto }
  from './dto/create-approval-workflow.dto';

import { UpdateApprovalWorkflowDto }
  from './dto/update-approval-workflow.dto';

@Injectable()
export class ApprovalWorkflowService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(
    dto: CreateApprovalWorkflowDto,
  ) {
    const workflow =
      await this.prisma.approvalWorkflow.create({
        data: dto,
      });

    await this.auditService.log(
      'ApprovalWorkflow',
      workflow.id,
      'CREATE',
      null,
      workflow,
    );

    return workflow;
  }

  async findAll() {
    return this.prisma.approvalWorkflow.findMany({
      include: {
        company: true,
        steps: true,
      },
      orderBy: {
        workflowName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const workflow =
      await this.prisma.approvalWorkflow.findUnique({
        where: { id },
        include: {
          company: true,
          steps: true,
        },
      });

    if (!workflow) {
      throw new NotFoundException(
        'Workflow not found',
      );
    }

    return workflow;
  }

  async update(
    id: string,
    dto: UpdateApprovalWorkflowDto,
  ) {
    await this.findOne(id);

    const workflow =
      await this.prisma.approvalWorkflow.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'ApprovalWorkflow',
      id,
      'UPDATE',
      null,
      workflow,
    );

    return workflow;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.approvalWorkflow.delete({
      where: { id },
    });
  }
}