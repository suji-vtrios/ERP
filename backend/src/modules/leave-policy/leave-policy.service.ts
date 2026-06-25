import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateLeavePolicyDto } from './dto/create-leave-policy.dto';
import { Prisma } from '@prisma/client';
import { LeavePolicyFilterDto } from './dto/leave-policy-filter.dto';
import { UpdateLeavePolicyDto } from './dto/update-leave-policy.dto';

@Injectable()
export class LeavePolicyService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateLeavePolicyDto) {
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

        if (dto.departmentId) {
            const department =
                await this.prisma.department.findUnique({
                where: {
                    id: dto.departmentId,
                },
                });

            if (!department) {
                throw new BadRequestException(
                'Department not found',
                );
            }
            }

        if (dto.designationId) {
            const designation =
                await this.prisma.designation.findUnique({
                where: {
                    id: dto.designationId,
                },
                });

            if (!designation) {
                throw new BadRequestException(
                'Designation not found',
                );
            }
            }
    const existing =
      await this.prisma.leavePolicy.findFirst({
        where: {
          companyId: dto.companyId,
          branchId: dto.branchId,
          departmentId: dto.departmentId ?? null,
          designationId: dto.designationId ?? null,
          leaveTypeId: dto.leaveTypeId,
          isActive: true,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Leave policy already exists',
      );
    }

    return this.prisma.leavePolicy.create({
      data: {
        companyId: dto.companyId,
        branchId: dto.branchId,
        departmentId: dto.departmentId,
        designationId: dto.designationId,
        leaveTypeId: dto.leaveTypeId,
        annualEntitlement: dto.annualEntitlement,
        carryForwardLimit: dto.carryForwardLimit,
        maxConsecutiveDays: dto.maxConsecutiveDays,
        allowNegativeBalance:
          dto.allowNegativeBalance,
      },
    });
  }

  async findAll(
    filters: LeavePolicyFilterDto,
    ) {
    const where: Prisma.LeavePolicyWhereInput = {
        isActive: true,
    };

    if (filters.companyId) {
        where.companyId = filters.companyId;
    }

    if (filters.branchId) {
        where.branchId = filters.branchId;
    }

    if (filters.departmentId) {
        where.departmentId = filters.departmentId;
    }

    if (filters.designationId) {
        where.designationId = filters.designationId;
    }

    if (filters.leaveTypeId) {
        where.leaveTypeId = filters.leaveTypeId;
    }

    return this.prisma.leavePolicy.findMany({
        where,
        include: {
        company: true,
        branch: true,
        department: true,
        designation: true,
        leaveType: true,
        },
        orderBy: {
        createdAt: 'desc',
        },
    });
    }

  async findOne(id: string) {
    const policy =
        await this.prisma.leavePolicy.findUnique({
        where: { id },
        include: {
            company: true,
            branch: true,
            department: true,
            designation: true,
            leaveType: true,
        },
        });

    if (!policy || !policy.isActive) {
        throw new NotFoundException(
        'Leave policy not found',
        );
    }

    return policy;
    }

  async update(
    id: string,
    dto: UpdateLeavePolicyDto,
    ) {
    await this.findOne(id);

    return this.prisma.leavePolicy.update({
        where: { id },
        data: dto,
    });
    }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.leavePolicy.update({
        where: { id },
        data: {
        isActive: false,
        },
    });
    }
}