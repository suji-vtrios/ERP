import { Module } from '@nestjs/common';
import { TaskReviewsController } from './task-reviews.controller';
import { TaskReviewsService } from './task-reviews.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TaskReviewsController],
  providers: [
    TaskReviewsService,
    PrismaService,
  ],
})
export class TaskReviewsModule {}