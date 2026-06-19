import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApprovalWorkflowStepService } from './approval-workflow-step.service';

import { CreateApprovalWorkflowStepDto } from './dto/create-approval-workflow-step.dto';
import { UpdateApprovalWorkflowStepDto } from './dto/update-approval-workflow-step.dto';

@Controller('approval-workflow-steps')
export class ApprovalWorkflowStepController {
  constructor(
    private readonly approvalWorkflowStepService:
      ApprovalWorkflowStepService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateApprovalWorkflowStepDto,
  ) {
    return this.approvalWorkflowStepService.create(dto);
  }

  @Get()
  findAll() {
    return this.approvalWorkflowStepService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.approvalWorkflowStepService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateApprovalWorkflowStepDto,
  ) {
    return this.approvalWorkflowStepService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.approvalWorkflowStepService.remove(id);
  }
}