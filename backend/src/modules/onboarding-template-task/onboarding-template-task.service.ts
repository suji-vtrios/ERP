import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateOnboardingTemplateTaskDto } from './dto/create-onboarding-template-task.dto';
import { UpdateOnboardingTemplateTaskDto } from './dto/update-onboarding-template-task.dto';

@Injectable()
export class OnboardingTemplateTaskService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateOnboardingTemplateTaskDto,
  ) {
    const template =
      await this.prisma.onboardingTemplate.findUnique({
        where: {
          id: dto.onboardingTemplateId,
        },
      });
    const duplicateTask =
      await this.prisma.onboardingTemplateTask.findFirst({
        where: {
          onboardingTemplateId: dto.onboardingTemplateId,
          taskName: dto.taskName,
        },
      });

    if (duplicateTask) {
      throw new ConflictException(
        'Task already exists in template',
      );
    }

    const duplicateSequence =
      await this.prisma.onboardingTemplateTask.findFirst({
        where: {
          onboardingTemplateId: dto.onboardingTemplateId,
          sequenceNo: dto.sequenceNo,
        },
      });

    if (duplicateSequence) {
      throw new ConflictException(
        'Sequence number already exists',
      );
    }

    if (!template || !template.isActive) {
      throw new NotFoundException(
        'Onboarding template not found',
      );
    }

    return this.prisma.onboardingTemplateTask.create({
      data: {
        onboardingTemplateId:
          dto.onboardingTemplateId,
        taskName: dto.taskName,
        description: dto.description,
        sequenceNo: dto.sequenceNo,
        isMandatory:
          dto.isMandatory ?? true,
      },
    });
  }

  async findAll() {
    return this.prisma.onboardingTemplateTask.findMany({
      include: {
        onboardingTemplate: true,
      },
      orderBy: [
        {
          onboardingTemplateId: 'asc',
        },
        {
          sequenceNo: 'asc',
        },
      ],
    });
  }

  async findOne(id: string) {
    const task =
      await this.prisma.onboardingTemplateTask.findUnique({
        where: { id },
        include: {
          onboardingTemplate: true,
        },
      });

    if (!task) {
      throw new NotFoundException(
        'Template task not found',
      );
    }

    return task;
  }

  async update(
    id: string,
    dto: UpdateOnboardingTemplateTaskDto,
  ) {
    const existing =
      await this.prisma.onboardingTemplateTask.findUnique({
        where: { id },
      });

    if (!existing) {
      throw new NotFoundException(
        'Template task not found',
      );
    }

    return this.prisma.onboardingTemplateTask.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const existing =
      await this.prisma.onboardingTemplateTask.findUnique({
        where: { id },
      });

    if (!existing) {
      throw new NotFoundException(
        'Template task not found',
      );
    }

    return this.prisma.onboardingTemplateTask.delete({
      where: { id },
    });
  }
}