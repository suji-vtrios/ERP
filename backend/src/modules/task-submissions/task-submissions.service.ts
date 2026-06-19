import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskSubmissionDto } from './dto/create-task-submission.dto';
import { UpdateTaskSubmissionDto } from './dto/update-task-submission.dto';

@Injectable()
export class TaskSubmissionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateTaskSubmissionDto,
  ) {
    const existing =
      await this.prisma.taskSubmission.findFirst({
        where: {
          taskId: dto.taskId,
          versionNo: dto.versionNo,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Version already exists for this task',
      );
    }

    return this.prisma.taskSubmission.create({
      data: dto,
      include: {
        task: true,
        submittedBy: true,
      },
    });
  }

  async findByTask(taskId: string) {
    return this.prisma.taskSubmission.findMany({
      where: {
        taskId,
      },
      include: {
        submittedBy: true,
      },
      orderBy: {
        versionNo: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const submission =
      await this.prisma.taskSubmission.findUnique({
        where: { id },
        include: {
          task: true,
          submittedBy: true,
        },
      });

    if (!submission) {
      throw new NotFoundException(
        'Submission not found',
      );
    }

    return submission;
  }

  async update(
    id: string,
    dto: UpdateTaskSubmissionDto,
  ) {
    return this.prisma.taskSubmission.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.taskSubmission.delete({
      where: { id },
    });
  }
}