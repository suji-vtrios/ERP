import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateWorkScheduleItemDto } from './dto/create-work-schedule-item.dto';
import { UpdateWorkScheduleItemDto } from './dto/update-work-schedule-item.dto';

@Injectable()
export class WorkScheduleItemService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async create(
    dto: CreateWorkScheduleItemDto,
    ) {
    const schedule =
        await this.prisma.workSchedule.findUnique({
        where: {
            id: dto.workScheduleId,
        },
        });

    if (!schedule) {
        throw new NotFoundException(
        'Work schedule not found',
        );
    }

    const employee =
        await this.prisma.employee.findUnique({
        where: {
            id: dto.employeeId,
        },
        });

    if (!employee) {
        throw new NotFoundException(
        'Employee not found',
        );
    }

    if (dto.taskId) {
        const task =
        await this.prisma.projectTask.findUnique({
            where: {
            id: dto.taskId,
            },
        });

        if (!task) {
        throw new NotFoundException(
            'Task not found',
        );
        }
    }

    return this.prisma.workScheduleItem.create({
        data: {
        workScheduleId:
            dto.workScheduleId,
        employeeId:
            dto.employeeId,
        workDate:
            new Date(dto.workDate),
        taskId: dto.taskId,
        workCategoryId:
            dto.workCategoryId,
        title: dto.title,
        description:
            dto.description,
        plannedHours:
            dto.plannedHours,
        sourceType:
            'MANUAL_SCHEDULE',
        },
    });
    }

    async findById(id: string) {
    const item =
        await this.prisma.workScheduleItem.findUnique({
        where: { id },
        include: {
            task: true,
            employee: true,
            workCategory: true,
            childItems: true,
        },
        });

    if (!item) {
        throw new NotFoundException(
        'Work schedule item not found',
        );
    }

    return item;
    }

    async findBySchedule(
    workScheduleId: string,
    ) {
    return this.prisma.workScheduleItem.findMany({
        where: {
        workScheduleId,
        },
        include: {
        task: true,
        employee: true,
        workCategory: true,
        },
        orderBy: {
        workDate: 'asc',
        },
    });
    }

    async update(
    id: string,
    dto: UpdateWorkScheduleItemDto,
    ) {
    await this.findById(id);

    return this.prisma.workScheduleItem.update({
        where: { id },
        data: dto,
    });
    }

    async remove(id: string) {
    await this.findById(id);

    return this.prisma.workScheduleItem.delete({
        where: { id },
    });
    }
}