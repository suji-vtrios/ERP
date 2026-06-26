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
  private async generateEmployeeCode(): Promise<string> {
    const lastEmployee = await this.prisma.employee.findFirst({
      orderBy: {
        employeeCode: "desc",
      },
      select: {
        employeeCode: true,
      },
    });

    if (!lastEmployee) {
      return "EMP-000001";
    }

    const match = lastEmployee.employeeCode.match(/\d+$/);

    const nextNumber = match
      ? Number(match[0]) + 1
      : 1;

    return `EMP-${nextNumber
      .toString()
      .padStart(6, "0")}`;
  }

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

    const employeeCode =
      await this.generateEmployeeCode();

    const employee =
      await this.prisma.employee.create({
        data: {
          ...dto,
          employeeCode,
        },
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

  async summary() {
    const [
      active,
      probation,
      notice,
      terminated,
    ] = await Promise.all([
      this.prisma.employee.count({
        where: {
          employmentStatus: 'ACTIVE',
        },
      }),

      this.prisma.employee.count({
        where: {
          employmentStatus: 'PROBATION',
        },
      }),

      this.prisma.employee.count({
        where: {
          employmentStatus: 'NOTICE',
        },
      }),

      this.prisma.employee.count({
        where: {
          employmentStatus: 'TERMINATED',
        },
      }),
    ]);

    return [
      {
        key: 'active',
        label: 'Active Employees',
        value: active,
      },
      {
        key: 'probation',
        label: 'On Probation',
        value: probation,
      },
      {
        key: 'notice',
        label: 'Notice Period',
        value: notice,
      },
      {
        key: 'terminated',
        label: 'Terminated',
        value: terminated,
      },
    ];
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