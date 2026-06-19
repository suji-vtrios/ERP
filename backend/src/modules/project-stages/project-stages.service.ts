import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProjectStageDto } from './dto/create-project-stage.dto';
import { UpdateProjectStageDto } from './dto/update-project-stage.dto';

@Injectable()
export class ProjectStagesService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateProjectStageDto) {
    const existing =
      await this.prisma.projectStage.findFirst({
        where: {
          projectId: dto.projectId,
          stageCode: dto.stageCode,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Stage code already exists for this project',
      );
    }

    return this.prisma.projectStage.create({
      data: dto,
      include: {
        project: true,
      },
    });
  }

  async findAll() {
    return this.prisma.projectStage.findMany({
      include: {
        project: true,
      },
      orderBy: {
        sequenceNo: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const stage =
      await this.prisma.projectStage.findUnique({
        where: { id },
        include: {
          project: true,
          tasks: true,
        },
      });

    if (!stage) {
      throw new NotFoundException(
        'Stage not found',
      );
    }

    return stage;
  }

  async update(
    id: string,
    dto: UpdateProjectStageDto,
  ) {
    return this.prisma.projectStage.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.projectStage.delete({
      where: { id },
    });
  }
}