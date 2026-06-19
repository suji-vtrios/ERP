import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeeService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateEmployeeDto) {

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
      await this.prisma.department.findUnique({
        where: {
          id: dto.departmentId,
        },
      });

    if (!department) {
      throw new NotFoundException(
        'Department not found',
      );
    }

    const employee =
      await this.prisma.employee.create({
        data: dto,
      });

    await this.auditService.log(
      'Employee',
      employee.id,
      'CREATE',
      null,
      employee,
    );

    return employee;
  }

  async findAll() {
    return this.prisma.employee.findMany({
      include: {
        company: true,
        branch: true,
        department: true,
        designation: true,

            manager: {
                select: {
                id: true,
                employeeCode: true,
                firstName: true,
                lastName: true,
                },
            },
      },
      orderBy: {
        firstName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const employee =
      await this.prisma.employee.findUnique({
        where: { id },
        include: {
          company: true,
          branch: true,
          department: true,
          designation: true,

            manager: {
                select: {
                id: true,
                employeeCode: true,
                firstName: true,
                lastName: true,
                },
            },        
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    return employee;
  }

  async update(
    id: string,
    dto: UpdateEmployeeDto,
  ) {
    const oldEmployee =
      await this.findOne(id);

    const employee =
      await this.prisma.employee.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Employee',
      id,
      'UPDATE',
      oldEmployee,
      employee,
    );

    return employee;
  }

  async deactivate(id: string) {
    const oldEmployee =
      await this.findOne(id);

    const employee =
      await this.prisma.employee.update({
        where: { id },
        data: {
          isActive: false,
          employmentStatus: 'TERMINATED',
        },
      });

    await this.auditService.log(
      'Employee',
      id,
      'DEACTIVATE',
      oldEmployee,
      employee,
    );

    return employee;
  }
}