import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';

import { TaskWorkSessionService } from './task-work-session.service';

import { CreateTaskWorkSessionDto } from './dto/create-task-work-session.dto';
import { EndTaskWorkSessionDto } from './dto/end-task-work-session.dto';

@Controller('task-work-session')
export class TaskWorkSessionController {
  constructor(
    private readonly taskWorkSessionService: TaskWorkSessionService,
  ) {}

  @Post('start')
  startSession(
    @Body() dto: CreateTaskWorkSessionDto,
  ) {
    return this.taskWorkSessionService.startSession(
      dto,
    );
  }
  @Post(':id/end')
    endSession(
    @Param('id') id: string,
    @Body() dto: EndTaskWorkSessionDto,
    ) {
    return this.taskWorkSessionService.endSession(
        id,
        dto,
    );
    }
}