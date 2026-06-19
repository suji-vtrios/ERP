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

import { ProjectTasksService } from './project-tasks.service';

import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';

@ApiTags('Project Tasks')
@Controller('project-tasks')
export class ProjectTasksController {
  constructor(
    private readonly service: ProjectTasksService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateProjectTaskDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('project/:projectId')
  findByProject(
    @Param('projectId')
    projectId: string,
  ) {
    return this.service.findByProject(projectId);
  }

  @Get('stage/:stageId')
  findByStage(
    @Param('stageId')
    stageId: string,
  ) {
    return this.service.findByStage(stageId);
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
    dto: UpdateProjectTaskDto,
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