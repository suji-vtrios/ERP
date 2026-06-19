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

import { TaskParticipantsService } from './task-participants.service';

import { CreateTaskParticipantDto } from './dto/create-task-participant.dto';
import { UpdateTaskParticipantDto } from './dto/update-task-participant.dto';

@ApiTags('Task Participants')
@Controller('task-participants')
export class TaskParticipantsController {
  constructor(
    private readonly service: TaskParticipantsService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateTaskParticipantDto,
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
    dto: UpdateTaskParticipantDto,
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