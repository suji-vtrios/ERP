import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskReviewDto } from './dto/create-task-review.dto';
import { UpdateTaskReviewDto } from './dto/update-task-review.dto';

@Injectable()
export class TaskReviewsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateTaskReviewDto) {
    const validDecisions = [
      'PENDING',
      'REJECTED',
      'APPROVED',
    ];

    if (
      !validDecisions.includes(
        dto.decision.toUpperCase(),
      )
    ) {
      throw new BadRequestException(
        'Invalid review decision',
      );
    }

    return this.prisma.taskReview.create({
      data: {
        ...dto,
        decision: dto.decision.toUpperCase(),
      },
      include: {
        submission: true,
        reviewer: true,
      },
    });
  }

  async findBySubmission(
    submissionId: string,
  ) {
    return this.prisma.taskReview.findMany({
      where: {
        submissionId,
      },
      include: {
        reviewer: true,
      },
      orderBy: {
        reviewedAt: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const review =
      await this.prisma.taskReview.findUnique({
        where: { id },
        include: {
          submission: true,
          reviewer: true,
        },
      });

    if (!review) {
      throw new NotFoundException(
        'Review not found',
      );
    }

    return review;
  }

  async update(
    id: string,
    dto: UpdateTaskReviewDto,
  ) {
    return this.prisma.taskReview.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    return this.prisma.taskReview.delete({
      where: { id },
    });
  }
}