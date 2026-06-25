import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateEmployeeShiftDto } from './dto/create-employee-shift.dto';

@Injectable()
export class EmployeeShiftService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateEmployeeShiftDto,
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

    const shift =
      await this.prisma.shift.findUnique({
        where: {
          id: dto.shiftId,
        },
      });

    if (!shift) {
      throw new BadRequestException(
        'Shift not found',
      );
    }

    return this.prisma.employeeShift.create({
      data: {
        employeeId: dto.employeeId,
        shiftId: dto.shiftId,
        effectiveFrom: new Date(
          dto.effectiveFrom,
        ),
        effectiveTo: dto.effectiveTo
          ? new Date(dto.effectiveTo)
          : null,
      },
    });
  }

  async findAll() {
    return this.prisma.employeeShift.findMany({
      include: {
        employee: true,
        shift: true,
      },
      orderBy: {
        effectiveFrom: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const record =
      await this.prisma.employeeShift.findUnique({
        where: { id },
        include: {
          employee: true,
          shift: true,
        },
      });

    if (!record) {
      throw new NotFoundException(
        'Assignment not found',
      );
    }

    return record;
  }
}