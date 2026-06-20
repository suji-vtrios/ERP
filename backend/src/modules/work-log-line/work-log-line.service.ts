import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { WorkLogHeaderService } from '../work-log-header/work-log-header.service';

import { CreateWorkLogLineDto } from './dto/create-work-log-line.dto';
import { UpdateWorkLogLineDto } from './dto/update-work-log-line.dto';

@Injectable()
export class WorkLogLineService {
  constructor(
    private prisma: PrismaService,
    private workLogHeaderService: WorkLogHeaderService,
    ) {}

  async create(
    dto: CreateWorkLogLineDto,
    ) {
    const workLogHeader =
        await this.prisma.workLogHeader.findUnique({
        where: {
            id: dto.workLogHeaderId,
        },
        });

    if (!workLogHeader) {
        throw new NotFoundException(
        'Work log header not found',
        );
    }

    if (workLogHeader.status !== 'DRAFT') {
        throw new ConflictException(
        'Work log is already submitted',
        );
    }

    if (
        !dto.taskId &&
        !dto.workCategoryId
    ) {
        throw new ConflictException(
        'Task or work category is required',
        );
    }

    const line =
        await this.prisma.workLogLine.create({
        data: {
            workLogHeaderId:
            dto.workLogHeaderId,
            workDate: new Date(
            dto.workDate,
            ),
            taskId: dto.taskId,
            workCategoryId:
            dto.workCategoryId,
            hours: dto.hours,
            remarks: dto.remarks,
            sourceType: 'MANUAL_ENTRY',
        },
        });

    await this.workLogHeaderService
        .recalculateTotalHours(
        dto.workLogHeaderId,
        );

    return line;
    }

  async findById(
    id: string,
    ) {
    const line =
        await this.prisma.workLogLine.findUnique({
        where: { id },
        include: {
            task: true,
            workCategory: true,
            taskWorkSession: true,
        },
        });

    if (!line) {
        throw new NotFoundException(
        'Work log line not found',
        );
    }

    return line;
    }

  async findByHeader(
    workLogHeaderId: string,
    ) {
    return this.prisma.workLogLine.findMany({
        where: {
        workLogHeaderId,
        },
        include: {
        task: true,
        workCategory: true,
        taskWorkSession: true,
        },
        orderBy: {
        workDate: 'asc',
        },
    });
    }

  async update(
    id: string,
    dto: UpdateWorkLogLineDto,
    ) {
    const line =
        await this.findById(id);

    const header =
        await this.prisma.workLogHeader.findUnique({
        where: {
            id: line.workLogHeaderId,
        },
        });

    if (!header) {
        throw new NotFoundException(
        'Work log header not found',
        );
    }

    if (header.status !== 'DRAFT') {
        throw new ConflictException(
        'Only draft work logs can be modified',
        );
    }

    const updatedLine =
        await this.prisma.workLogLine.update({
        where: {
            id,
        },
        data: {
            workDate: dto.workDate
            ? new Date(dto.workDate)
            : undefined,
            taskId: dto.taskId,
            workCategoryId:
            dto.workCategoryId,
            hours: dto.hours,
            remarks: dto.remarks,
        },
        });

    await this.workLogHeaderService
        .recalculateTotalHours(
        line.workLogHeaderId,
        );

    return updatedLine;
    }

  async remove(
    id: string,
    ) {
    const line =
        await this.findById(id);

    const header =
        await this.prisma.workLogHeader.findUnique({
        where: {
            id: line.workLogHeaderId,
        },
        });

    if (!header) {
        throw new NotFoundException(
        'Work log header not found',
        );
    }

    if (header.status !== 'DRAFT') {
        throw new ConflictException(
        'Only draft work logs can be modified',
        );
    }

    await this.prisma.workLogLine.delete({
        where: {
        id,
        },
    });

    await this.workLogHeaderService
        .recalculateTotalHours(
        line.workLogHeaderId,
        );

    return {
        message:
        'Work log line deleted successfully',
    };
    }
}