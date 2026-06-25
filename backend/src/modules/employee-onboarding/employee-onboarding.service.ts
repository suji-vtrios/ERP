import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateEmployeeOnboardingDto } from './dto/create-employee-onboarding.dto';
import { UpdateEmployeeOnboardingDto } from './dto/update-employee-onboarding.dto';

@Injectable()
export class EmployeeOnboardingService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(
    dto: CreateEmployeeOnboardingDto,
  ) {
      const employee =
        await this.prisma.employee.findFirst({
          where: {
            id: dto.employeeId,
            companyId: dto.companyId,
            isActive: true,
          },
        });

      if (!employee) {
        throw new NotFoundException(
          'Employee not found',
        );
      }
    const template =
      await this.prisma.onboardingTemplate.findFirst({
        where: {
          id: dto.templateId,
          companyId: dto.companyId,
          isActive: true,
        },
      });

    if (!template) {
      throw new NotFoundException(
        'Onboarding template not found',
      );
    }

  const existing =
    await this.prisma.employeeOnboarding.findFirst({
      where: {
        employeeId: dto.employeeId,
        status: 'IN_PROGRESS',
      },
    });

  if (existing) {
    throw new ConflictException(
      'Employee already has active onboarding',
    );
  }

  const templateTasks =
    await this.prisma.onboardingTemplateTask.findMany({
      where: {
        onboardingTemplateId: dto.templateId,
      },
      orderBy: {
        sequenceNo: 'asc',
      },
    });

  const result =
    await this.prisma.$transaction(
      async (tx) => {
        const onboarding =
          await tx.employeeOnboarding.create({
            data: {
              companyId: dto.companyId,
              employeeId: dto.employeeId,
              templateId: dto.templateId,
              startDate: new Date(dto.startDate),
              remarks: dto.remarks,
              status: 'IN_PROGRESS',
            },
          });
        if (templateTasks.length > 0) {
          await tx.employeeOnboardingTask.createMany({
            data: templateTasks.map((task) => ({
              onboardingId: onboarding.id,

              taskName: task.taskName,
              description: task.description,

              sequenceNo: task.sequenceNo,

              isMandatory: task.isMandatory,

              status: 'PENDING',
            })),
          });
        }
        return tx.employeeOnboarding.findUnique({
          where: {
            id: onboarding.id,
          },
          include: {
            employee: true,
            template: true,
            tasks: {
              orderBy: {
                sequenceNo: 'asc',
              },
            },
          },
        });
      },
    );

    return result;
    }

  async findAll() {
    return this.prisma.employeeOnboarding.findMany({
      include: {
        employee: true,
        template: true,
        tasks: {
          orderBy: {
            sequenceNo: 'asc',
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const onboarding =
      await this.prisma.employeeOnboarding.findUnique({
        where: { id },
        include: {
          employee: true,
          template: true,
          tasks: {
            orderBy: {
              sequenceNo: 'asc',
            },
          },
        },
      });

    if (!onboarding) {
      throw new NotFoundException(
        'Employee onboarding not found',
      );
    }

    return onboarding;
  }

  async update(
    id: string,
    dto: UpdateEmployeeOnboardingDto,
  ) {
    const existing =
      await this.findOne(id);

    return this.prisma.employeeOnboarding.update({
      where: {
        id: existing.id,
      },
      data: {
        remarks: dto.remarks,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employeeOnboarding.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });
  }

  async completeOnboarding(id: string) {
    const onboarding =
      await this.prisma.employeeOnboarding.findUnique({
        where: { id },
        include: {
          tasks: true,
        },
      });

    if (!onboarding) {
      throw new NotFoundException(
        'Employee onboarding not found',
      );
    }

    if (onboarding.status === 'COMPLETED') {
      throw new BadRequestException(
        'Onboarding already completed',
      );
    }

    const pendingMandatoryTasks =
      onboarding.tasks.filter(
        (task) =>
          task.isMandatory &&
          task.status !== 'COMPLETED',
      );

    if (pendingMandatoryTasks.length > 0) {
      throw new BadRequestException(
        'Mandatory onboarding tasks are pending',
      );
    }

    return this.prisma.employeeOnboarding.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        completedDate: new Date(),
      },
      include: {
        employee: true,
        template: true,
        tasks: {
          orderBy: {
            sequenceNo: 'asc',
          },
        },
      },
    });
  }
}
