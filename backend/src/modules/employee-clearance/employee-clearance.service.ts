import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateEmployeeClearanceDto } from './dto/create-employee-clearance.dto';

import { ClearanceItemActionDto } from './dto/clearance-item-action.dto';

@Injectable()
export class EmployeeClearanceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(
    dto: CreateEmployeeClearanceDto,
  ) {
    const separation =
      await this.prisma.employeeSeparation.findUnique({
        where: {
          id: dto.separationId,
        },
      });

    if (!separation) {
      throw new BadRequestException(
        'Separation not found',
      );
    }

    const exists =
      await this.prisma.employeeClearance.findUnique({
        where: {
          separationId: dto.separationId,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Clearance already exists',
      );
    }

    const clearance =
      await this.prisma.employeeClearance.create({
        data: {
          separationId: dto.separationId,
        },
      });

    await this.prisma.employeeClearanceItem.createMany({
      data: [
        {
          clearanceId: clearance.id,
          clearanceType: 'ASSET',
          itemName: 'Asset Return',
        },
        {
          clearanceId: clearance.id,
          clearanceType: 'HR',
          itemName: 'Leave Settlement',
        },
        {
          clearanceId: clearance.id,
          clearanceType: 'FINANCE',
          itemName: 'Final Settlement',
        },
        {
          clearanceId: clearance.id,
          clearanceType: 'IT',
          itemName: 'System Access Removal',
        },
        {
          clearanceId: clearance.id,
          clearanceType: 'ADMIN',
          itemName: 'ID Card Return',
        },
      ],
    });

    return this.findOne(clearance.id);
  }

  async findAll() {
    return this.prisma.employeeClearance.findMany({
      include: {
        separation: true,
        items: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  async findOne(id: string) {
    const clearance =
      await this.prisma.employeeClearance.findUnique({
        where: { id },
        include: {
          separation: true,
          items: true,
        },
      });

    if (!clearance) {
      throw new NotFoundException(
        'Clearance not found',
      );
    }

    return clearance;
  }

  async clearItem(
    itemId: string,
    dto: ClearanceItemActionDto,
  ) {
    return this.prisma.employeeClearanceItem.update({
      where: {
        id: itemId,
      },
      data: {
        status: 'CLEARED',
        clearedById: dto.clearedById,
        clearedDate: new Date(),
        remarks: dto.remarks,
      },
    });
  }

  async complete(id: string) {
    const pending =
      await this.prisma.employeeClearanceItem.count({
        where: {
          clearanceId: id,
          status: {
            not: 'CLEARED',
          },
        },
      });

    if (pending > 0) {
      throw new BadRequestException(
        'Pending clearance items exist',
      );
    }

    const clearance =
      await this.prisma.employeeClearance.update({
        where: {
          id,
        },
        data: {
          status: 'COMPLETED',
          completedDate: new Date(),
        },
      });

    await this.prisma.employeeSeparation.update({
      where: {
        id: clearance.separationId,
      },
      data: {
        status: 'COMPLETED',
      },
    });

    return clearance;
  }
}
