import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { TaskSubmissionsService } from './task-submissions.service';

import { CreateTaskSubmissionDto } from './dto/create-task-submission.dto';
import { UpdateTaskSubmissionDto } from './dto/update-task-submission.dto';

@ApiTags('Task Submissions')
@Controller('task-submissions')
export class TaskSubmissionsController {
  constructor(
    private readonly service: TaskSubmissionsService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateTaskSubmissionDto,
  ) {
    return this.service.create(dto);
  }

  @Get('task/:taskId')
  findByTask(
    @Param('taskId')
    taskId: string,
  ) {
    return this.service.findByTask(taskId);
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateTaskSubmissionDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.service.remove(id);
  }
}