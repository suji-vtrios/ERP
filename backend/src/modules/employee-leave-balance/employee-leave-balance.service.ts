import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { Prisma } from '@prisma/client';

import { CreateEmployeeLeaveBalanceDto } from './dto/create-employee-leave-balance.dto';
import { UpdateEmployeeLeaveBalanceDto } from './dto/update-employee-leave-balance.dto';
import { EmployeeLeaveBalanceFilterDto } from './dto/employee-leave-balance-filter.dto';

@Injectable()
export class EmployeeLeaveBalanceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateEmployeeLeaveBalanceDto,
  ) {
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: dto.employeeId,
        },
      });

    if (!employee) {
      throw new BadRequestException(
        'Employee not found',
      );
    }

    const leaveType =
      await this.prisma.leaveType.findUnique({
        where: {
          id: dto.leaveTypeId,
        },
      });

    if (!leaveType) {
      throw new BadRequestException(
        'Leave type not found',
      );
    }

    const existing =
      await this.prisma.employeeLeaveBalance.findFirst({
        where: {
          employeeId: dto.employeeId,
          leaveTypeId: dto.leaveTypeId,
          year: dto.year,
          isActive: true,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Leave balance already exists',
      );
    }

    const used = dto.used ?? 0;
    const pending = dto.pending ?? 0;

    const balance =
      dto.balance ??
      (dto.entitlement - used - pending);

    return this.prisma.employeeLeaveBalance.create({
      data: {
        employeeId: dto.employeeId,
        leaveTypeId: dto.leaveTypeId,
        year: dto.year,
        entitlement: dto.entitlement,
        used,
        pending,
        balance,
      },
    });
  }

  async findAll(
    filters: EmployeeLeaveBalanceFilterDto,
  ) {
    const where: Prisma.EmployeeLeaveBalanceWhereInput =
      {
        isActive: true,
      };

    if (filters.employeeId) {
      where.employeeId = filters.employeeId;
    }

    if (filters.leaveTypeId) {
      where.leaveTypeId = filters.leaveTypeId;
    }

    if (filters.year) {
      where.year = filters.year;
    }

    return this.prisma.employeeLeaveBalance.findMany({
      where,
      include: {
        employee: true,
        leaveType: true,
      },
      orderBy: {
        year: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const balance =
      await this.prisma.employeeLeaveBalance.findUnique({
        where: { id },
        include: {
          employee: true,
          leaveType: true,
        },
      });

    if (!balance || !balance.isActive) {
      throw new NotFoundException(
        'Leave balance not found',
      );
    }

    return balance;
  }

  async update(
    id: string,
    dto: UpdateEmployeeLeaveBalanceDto,
  ) {
    await this.findOne(id);

    const existing = await this.findOne(id);

    const entitlement =
    dto.entitlement ?? Number(existing.entitlement);

    const used =
    dto.used ?? Number(existing.used);

    const pending =
    dto.pending ?? Number(existing.pending);

    const balance =
    entitlement - used - pending;

    return this.prisma.employeeLeaveBalance.update({
    where: { id },
    data: {
        ...dto,
        balance,
    },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employeeLeaveBalance.update({
      where: { id },
      data: {
        isActive: false,
      },
    });
  }
}