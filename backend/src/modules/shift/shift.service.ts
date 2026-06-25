import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Injectable()
export class ShiftService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateShiftDto,
  ) {
    const existing =
      await this.prisma.shift.findUnique({
        where: {
          shiftCode: dto.shiftCode,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Shift code already exists',
      );
    }

    return this.prisma.shift.create({
      data: {
        shiftCode: dto.shiftCode,
        shiftName: dto.shiftName,
        startTime: dto.startTime,
        endTime: dto.endTime,
        breakMinutes:
          dto.breakMinutes ?? 60,
        graceMinutes:
          dto.graceMinutes ?? 15,
        isNightShift:
          dto.isNightShift ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.shift.findMany({
      orderBy: {
        shiftName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const shift =
      await this.prisma.shift.findUnique({
        where: { id },
      });

    if (!shift) {
      throw new NotFoundException(
        'Shift not found',
      );
    }

    return shift;
  }

  async update(
    id: string,
    dto: UpdateShiftDto,
  ) {
    const shift =
      await this.prisma.shift.findUnique({
        where: { id },
      });

    if (!shift) {
      throw new NotFoundException(
        'Shift not found',
      );
    }

    return this.prisma.shift.update({
      where: { id },
      data: dto,
    });
  }
}