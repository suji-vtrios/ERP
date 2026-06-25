import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateOnboardingTemplateDto } from './dto/create-onboarding-template.dto';
import { UpdateOnboardingTemplateDto } from './dto/update-onboarding-template.dto';

@Injectable()
export class OnboardingTemplateService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateOnboardingTemplateDto,
  ) {
    const existing =
      await this.prisma.onboardingTemplate.findFirst({
        where: {
          companyId: dto.companyId,
          templateName: dto.templateName,
          isActive: true,
        },
      });

    if (existing) {
      throw new ConflictException(
        'Onboarding template already exists',
      );
    }

    return this.prisma.onboardingTemplate.create({
      data: {
        companyId: dto.companyId,
        templateCode: dto.templateCode,
        templateName: dto.templateName,
        description: dto.description,
      },
    });
  }

  async findAll() {
    return this.prisma.onboardingTemplate.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        templateName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const template =
      await this.prisma.onboardingTemplate.findUnique({
        where: { id },
        include: {
          tasks: {
            orderBy: {
              sequenceNo: 'asc',
            },
          },
        },
      });

    if (!template) {
      throw new NotFoundException(
        'Onboarding template not found',
      );
    }

    return template;
  }

  async update(
    id: string,
    dto: UpdateOnboardingTemplateDto,
  ) {
    const existing =
      await this.prisma.onboardingTemplate.findUnique({
        where: { id },
      });

    if (!existing) {
      throw new NotFoundException(
        'Onboarding template not found',
      );
    }

    if (dto.templateName) {
      const duplicate =
        await this.prisma.onboardingTemplate.findFirst({
          where: {
            companyId: existing.companyId,
            templateName: dto.templateName,
            NOT: {
              id,
            },
            isActive: true,
          },
        });

      if (duplicate) {
        throw new ConflictException(
          'Onboarding template already exists',
        );
      }
    }

    return this.prisma.onboardingTemplate.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  async remove(id: string) {
    const existing =
      await this.prisma.onboardingTemplate.findUnique({
        where: { id },
      });

    if (!existing) {
      throw new NotFoundException(
        'Onboarding template not found',
      );
    }

    return this.prisma.onboardingTemplate.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}