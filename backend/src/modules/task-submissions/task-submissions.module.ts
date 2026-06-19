import { Module } from '@nestjs/common';
import { TaskSubmissionsController } from './task-submissions.controller';
import { TaskSubmissionsService } from './task-submissions.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TaskSubmissionsController],
  providers: [
    TaskSubmissionsService,
    PrismaService,
  ],
})
export class TaskSubmissionsModule {}