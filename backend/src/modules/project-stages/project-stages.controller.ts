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

import { ProjectStagesService } from './project-stages.service';

import { CreateProjectStageDto } from './dto/create-project-stage.dto';
import { UpdateProjectStageDto } from './dto/update-project-stage.dto';

@ApiTags('Project Stages')
@Controller('project-stages')
export class ProjectStagesController {
  constructor(
    private readonly service: ProjectStagesService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateProjectStageDto,
  ) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
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
    dto: UpdateProjectStageDto,
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