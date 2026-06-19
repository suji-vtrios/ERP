import { Module } from '@nestjs/common';
import { ProjectTasksController } from './project-tasks.controller';
import { ProjectTasksService } from './project-tasks.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProjectTasksController],
  providers: [
    ProjectTasksService,
    PrismaService,
  ],
})
export class ProjectTasksModule {}