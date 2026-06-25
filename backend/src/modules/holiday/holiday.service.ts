import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateHolidayDto } from './dto/create-holiday.dto';
import { HolidayFilterDto } from './dto/holiday-filter.dto';
import { Prisma } from '@prisma/client';
import { UpdateHolidayDto } from './dto/update-holiday.dto';


@Injectable()
export class HolidayService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateHolidayDto) {
    const company =
        await this.prisma.company.findUnique({
            where: {
            id: dto.companyId,
            },
        });

        if (!company) {
        throw new BadRequestException(
            'Company not found',
        );
        }
    if (dto.branchId) {
        const branch =
            await this.prisma.branch.findUnique({
            where: {
                id: dto.branchId,
            },
            });

        if (!branch) {
            throw new BadRequestException(
            'Branch not found',
            );
        }
        }
    const existingHoliday =
        await this.prisma.holiday.findFirst({
        where: {
            companyId: dto.companyId,
            branchId: dto.branchId ?? null,
            holidayName: dto.holidayName,
            holidayDate: new Date(dto.holidayDate),
            isActive: true,
        },
        });
        if (dto.holidayCode) {
            const codeExists =
                await this.prisma.holiday.findFirst({
                where: {
                    companyId: dto.companyId,
                    holidayCode: dto.holidayCode,
                    isActive: true,
                },
                });

            if (codeExists) {
                throw new BadRequestException(
                'Holiday code already exists',
                );
            }
            }

    if (existingHoliday) {
        throw new BadRequestException(
        'Holiday already exists',
        );
    }

    return this.prisma.holiday.create({
        data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        holidayCode: dto.holidayCode,
        holidayName: dto.holidayName,
        description: dto.description,
        holidayDate: new Date(dto.holidayDate),
        holidayType: dto.holidayType,
        },
    });
    }

  async findAll(filters: HolidayFilterDto) {
    const where: Prisma.HolidayWhereInput = {
    isActive: true,
    };

    if (filters.companyId) {
        where.companyId = filters.companyId;
    }

    if (filters.branchId) {
        where.branchId = filters.branchId;
    }

    if (filters.holidayType) {
        where.holidayType =
            filters.holidayType;
        }

    if (filters.year) {
        where.holidayDate = {
        gte: new Date(`${filters.year}-01-01`),
        lt: new Date(`${filters.year + 1}-01-01`),
        };
    }

    return this.prisma.holiday.findMany({
        where,
        include: {
            company: {
            select: {
                id: true,
                companyCode: true,
                companyName: true,
            },
            },
            branch: {
            select: {
                id: true,
                branchCode: true,
                branchName: true,
            },
            },
        },
        orderBy: {
            holidayDate: 'asc',
        },
        });
    }

  async findOne(id: string) {
    const holiday =
        await this.prisma.holiday.findUnique({
        where: { id },
        include: {
            company: true,
            branch: true,
        },
        });

    if (!holiday || !holiday.isActive) {
        throw new NotFoundException(
        'Holiday not found',
        );
    }

    return holiday;
    }

  async update(
    id: string,
    dto: UpdateHolidayDto,
    ) {
    await this.findOne(id);

    return this.prisma.holiday.update({
        where: { id },
        data: {
        ...dto,
        holidayDate: dto.holidayDate
            ? new Date(dto.holidayDate)
            : undefined,
        },
    });
    }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.holiday.update({
        where: { id },
        data: {
        isActive: false,
        },
    });
    }
}