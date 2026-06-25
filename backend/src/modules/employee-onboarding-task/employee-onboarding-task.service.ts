import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CompleteOnboardingTaskDto } from './dto/complete-onboarding-task.dto';

@Injectable()
  export class EmployeeOnboardingTaskService {
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  async completeTask(
    id: string,
    dto: CompleteOnboardingTaskDto,
  ) {
    const task =
      await this.prisma.employeeOnboardingTask.findUnique({
        where: { id },
      });

    if (!task) {
      throw new NotFoundException(
        'Onboarding task not found',
      );
    }

    if (task.status === 'COMPLETED') {
      throw new BadRequestException(
        'Task already completed',
      );
    }

    return this.prisma.employeeOnboardingTask.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedDate: new Date(),
        remarks: dto.remarks,
      },
    });
  }

  async reopenTask(id: string) {
    const task =
      await this.prisma.employeeOnboardingTask.findUnique({
        where: { id },
      });

    if (!task) {
      throw new NotFoundException(
        'Onboarding task not found',
      );
    }

    if (task.status === 'PENDING') {
      throw new BadRequestException(
        'Task is already pending',
      );
    }

    return this.prisma.employeeOnboardingTask.update({
      where: { id },
      data: {
        status: 'PENDING',
        completedDate: null,
      },
    });
  }

}
