import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskParticipantDto } from './dto/create-task-participant.dto';
import { UpdateTaskParticipantDto } from './dto/update-task-participant.dto';

@Injectable()
export class TaskParticipantsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateTaskParticipantDto,
  ) {
    const existing =
      await this.prisma.taskParticipant.findFirst({
        where: {
          taskId: dto.taskId,
          employeeId: dto.employeeId,
          role: dto.role,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Participant already exists for this role',
      );
    }

    return this.prisma.taskParticipant.create({
      data: dto,
      include: {
        task: true,
        employee: true,
      },
    });
  }

  async findByTask(taskId: string) {
    return this.prisma.taskParticipant.findMany({
      where: {
        taskId,
      },
      include: {
        employee: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const participant =
      await this.prisma.taskParticipant.findUnique({
        where: { id },
        include: {
          task: true,
          employee: true,
        },
      });

    if (!participant) {
      throw new NotFoundException(
        'Participant not found',
      );
    }

    return participant;
  }

  async update(
    id: string,
    dto: UpdateTaskParticipantDto,
  ) {
    return this.prisma.taskParticipant.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.taskParticipant.delete({
      where: { id },
    });
  }
}