import { Module } from '@nestjs/common';
import { ProjectTeamMembersController } from './project-team-members.controller';
import { ProjectTeamMembersService } from './project-team-members.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProjectTeamMembersController],
  providers: [
    ProjectTeamMembersService,
    PrismaService,
  ],
})
export class ProjectTeamMembersModule {}