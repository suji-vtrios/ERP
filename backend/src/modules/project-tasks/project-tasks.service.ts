import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateProjectTaskDto } from './dto/create-project-task.dto';
import { UpdateProjectTaskDto } from './dto/update-project-task.dto';

@Injectable()
export class ProjectTasksService {
    constructor(
  private readonly prisma: PrismaService,
) {}
async create(dto: CreateProjectTaskDto) {
  const existing =
    await this.prisma.projectTask.findFirst({
      where: {
        projectId: dto.projectId,
        taskCode: dto.taskCode,
      },
    });

  if (existing) {
    throw new BadRequestException(
      'Task code already exists in project',
    );
  }

  return this.prisma.projectTask.create({
    data: dto,
    include: {
      project: true,
      stage: true,
    },
  });
}

async findAll() {
  return this.prisma.projectTask.findMany({
    include: {
      project: true,
      stage: true,
      participants: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
async findByProject(projectId: string) {
  return this.prisma.projectTask.findMany({
    where: {
      projectId,
    },
    include: {
      stage: true,
    },
  });
}
async findByStage(stageId: string) {
  return this.prisma.projectTask.findMany({
    where: {
      stageId,
    },
  });
}
async findOne(id: string) {
  const task = await this.prisma.projectTask.findUnique({
    where: { id },
    include: {
      project: true,
      stage: true,
      participants: {
        include: {
          employee: true,
        },
      },
      submissions: true,
    },
  });

  if (!task) {
    throw new NotFoundException(
      'Task not found',
    );
  }

  return task;
}

async update(
  id: string,
  dto: UpdateProjectTaskDto,
) {
  return this.prisma.projectTask.update({
    where: { id },
    data: dto,
  });
}

async remove(id: string) {
  const task =
    await this.prisma.projectTask.findUnique({
      where: { id },
    });

  if (!task) {
    throw new NotFoundException(
      'Task not found',
    );
  }

  return this.prisma.projectTask.delete({
    where: { id },
  });
}
}
