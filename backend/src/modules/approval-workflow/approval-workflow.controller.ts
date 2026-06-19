import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApprovalWorkflowService }
  from './approval-workflow.service';

import { CreateApprovalWorkflowDto }
  from './dto/create-approval-workflow.dto';

import { UpdateApprovalWorkflowDto }
  from './dto/update-approval-workflow.dto';

@Controller('approval-workflows')
export class ApprovalWorkflowController {
  constructor(
    private readonly approvalWorkflowService:
      ApprovalWorkflowService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateApprovalWorkflowDto,
  ) {
    return this.approvalWorkflowService.create(dto);
  }

  @Get()
  findAll() {
    return this.approvalWorkflowService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.approvalWorkflowService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateApprovalWorkflowDto,
  ) {
    return this.approvalWorkflowService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.approvalWorkflowService.remove(id);
  }
}