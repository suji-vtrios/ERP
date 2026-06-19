import { Module } from '@nestjs/common';
import { ProjectStagesController } from './project-stages.controller';
import { ProjectStagesService } from './project-stages.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProjectStagesController],
  providers: [
    ProjectStagesService,
    PrismaService,
  ],
})
export class ProjectStagesModule {}