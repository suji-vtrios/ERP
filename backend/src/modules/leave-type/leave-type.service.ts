import {
  Injectable,
  BadRequestException,
  NotFoundException
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeaveTypeDto } from './dto/create-leave-type.dto';
import { Prisma } from '@prisma/client';
import { LeaveTypeFilterDto } from './dto/leave-type-filter.dto';
import { UpdateLeaveTypeDto } from './dto/update-leave-type.dto';

@Injectable()
export class LeaveTypeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateLeaveTypeDto) {
    const existing =
        await this.prisma.leaveType.findFirst({
        where: {
            companyId: dto.companyId,
            leaveCode: dto.leaveCode.trim().toUpperCase(),
            isActive: true,
        },
        });

    if (existing) {
        throw new BadRequestException(
        'Leave code already exists',
        );
    }

    return this.prisma.leaveType.create({
        data: {
        companyId: dto.companyId,
        leaveCode: dto.leaveCode.trim().toUpperCase(),
        leaveName: dto.leaveName.trim(),
        description: dto.description?.trim(),
        isPaid: dto.isPaid,
        requiresApproval: dto.requiresApproval,
        allowHalfDay: dto.allowHalfDay,
        carryForwardAllowed:
            dto.carryForwardAllowed,
        },
    });
    }

  async findAll(filters: LeaveTypeFilterDto) {
    const where: Prisma.LeaveTypeWhereInput = {
        isActive: true,
    };

    if (filters.companyId) {
        where.companyId = filters.companyId;
    }

    return this.prisma.leaveType.findMany({
        where,
        include: {
        company: {
            select: {
            id: true,
            companyCode: true,
            companyName: true,
            },
        },
        },
        orderBy: {
        leaveName: 'asc',
        },
    });
    }

  async findOne(id: string) {
    const leaveType =
        await this.prisma.leaveType.findUnique({
        where: { id },
        include: {
            company: true,
        },
        });

    if (!leaveType || !leaveType.isActive) {
        throw new NotFoundException(
        'Leave type not found',
        );
    }

    return leaveType;
    }

  async update(
    id: string,
    dto: UpdateLeaveTypeDto,
    ) {
    const leaveType = await this.findOne(id);

    if (dto.leaveCode) {
        const existing =
        await this.prisma.leaveType.findFirst({
            where: {
            companyId: leaveType.companyId,
            leaveCode: dto.leaveCode.trim().toUpperCase(),
            id: {
                not: id,
            },
            isActive: true,
            },
        });

        if (existing) {
        throw new BadRequestException(
            'Leave code already exists',
        );
        }
    }

    return this.prisma.leaveType.update({
        where: { id },
        data: {
        ...dto,
        leaveCode: dto.leaveCode
            ? dto.leaveCode.trim().toUpperCase()
            : undefined,
        leaveName: dto.leaveName
            ? dto.leaveName.trim()
            : undefined,

            description: dto.description
            ? dto.description.trim()
            : undefined,
        },
    });
    }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.leaveType.update({
        where: { id },
        data: {
        isActive: false,
        },
    });
    }
}