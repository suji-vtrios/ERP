import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from '../../prisma/prisma.service';

import { AuditService }
from '../audit/audit.service';

import { CreateCompanyGroupDto }
from './dto/create-company-group.dto';

import { UpdateCompanyGroupDto }
from './dto/update-company-group.dto';

@Injectable()
export class CompanyGroupService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(
    dto: CreateCompanyGroupDto,
  ) {
    const group =
      await this.prisma.companyGroup.create({
        data: dto,
      });

    await this.auditService.log(
      'CompanyGroup',
      group.id,
      'CREATE',
      null,
      group,
    );

    return group;
  }

  async findAll() {
    return this.prisma.companyGroup.findMany({
      orderBy: {
        groupName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const group =
      await this.prisma.companyGroup.findUnique({
        where: { id },
      });

    if (!group) {
      throw new NotFoundException(
        'Company Group not found',
      );
    }

    return group;
  }

  async update(
    id: string,
    dto: UpdateCompanyGroupDto,
  ) {
    const oldGroup =
      await this.findOne(id);

    const updatedGroup =
      await this.prisma.companyGroup.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'CompanyGroup',
      id,
      'UPDATE',
      oldGroup,
      updatedGroup,
    );

    return updatedGroup;
  }

  async remove(id: string) {
    const group =
      await this.findOne(id);

    await this.auditService.log(
      'CompanyGroup',
      id,
      'DELETE',
      group,
      null,
    );

    return this.prisma.companyGroup.delete({
      where: { id },
    });
  }
}