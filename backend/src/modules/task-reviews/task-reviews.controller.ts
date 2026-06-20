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

import { TaskReviewsService } from './task-reviews.service';

import { CreateTaskReviewDto } from './dto/create-task-review.dto';
import { UpdateTaskReviewDto } from './dto/update-task-review.dto';

@ApiTags('Task Reviews')
@Controller('task-reviews')
export class TaskReviewsController {
  constructor(
    private readonly service: TaskReviewsService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateTaskReviewDto,
  ) {
    return this.service.create(dto);
  }

  @Get('submission/:submissionId')
  findBySubmission(
    @Param('submissionId')
    submissionId: string,
  ) {
    return this.service.findBySubmission(
      submissionId,
    );
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
    dto: UpdateTaskReviewDto,
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