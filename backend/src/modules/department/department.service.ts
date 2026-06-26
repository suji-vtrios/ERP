import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(
    dto: CreateDepartmentDto,
  ) {

    const company =
      await this.prisma.company.findUnique({
        where: {
          id: dto.companyId,
        },
      });

    if (!company) {
      throw new NotFoundException(
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
      throw new NotFoundException(
        'Branch not found',
      );
    }

    const department =
      await this.prisma.department.create({
        data: dto,
      });

    await this.auditService.log(
      'Department',
      department.id,
      'CREATE',
      null,
      department,
    );

    return department;
  }

  async findAll(branchId?: string) {
    return this.prisma.department.findMany({
      where: branchId
        ? {
            branchId,
          }
        : undefined,

      include: {
        company: true,
        branch: true,
      },

      orderBy: {
        departmentName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const department =
      await this.prisma.department.findUnique({
        where: { id },
        include: {
          company: true,
          branch: true,
        },
      });

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    return department;
  }

  async update(
    id: string,
    dto: UpdateDepartmentDto,
  ) {
    const oldDepartment =
      await this.findOne(id);

    const updatedDepartment =
      await this.prisma.department.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Department',
      id,
      'UPDATE',
      oldDepartment,
      updatedDepartment,
    );

    return updatedDepartment;
  }

  async remove(id: string) {
    const department =
      await this.findOne(id);

    await this.auditService.log(
      'Department',
      id,
      'DELETE',
      department,
      null,
    );

    return this.prisma.department.delete({
      where: { id },
    });
  }
}