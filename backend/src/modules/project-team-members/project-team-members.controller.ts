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

import { ProjectTeamMembersService } from './project-team-members.service';

import { CreateProjectTeamMemberDto } from './dto/create-project-team-member.dto';
import { UpdateProjectTeamMemberDto } from './dto/update-project-team-member.dto';

@ApiTags('Project Team Members')
@Controller('project-team-members')
export class ProjectTeamMembersController {
  constructor(
    private readonly service: ProjectTeamMembersService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateProjectTeamMemberDto,
  ) {
    return this.service.create(dto);
  }

  @Get('project/:projectId')
  findByProject(
    @Param('projectId')
    projectId: string,
  ) {
    return this.service.findByProject(projectId);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateProjectTeamMemberDto,
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