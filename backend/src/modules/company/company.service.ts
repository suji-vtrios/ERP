import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import {
  NotFoundException,
} from '@nestjs/common';
import { AuditService } from '../audit/audit.service';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(data: CreateCompanyDto) {
    const company = await this.prisma.company.create({
      data,
    });

    await this.auditService.log(
      'Company',
      company.id,
      'CREATE',
      null,
      company,
    );

    return company;
  }

  async findAll() {
    return this.prisma.company.findMany({
      orderBy: {
        companyName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const company =
      await this.prisma.company.findUnique({
        where: { id },
      });

    if (!company) {
      throw new NotFoundException(
        'Company not found',
      );
    }

    return company;
  }

async update(
  id: string,
  dto: UpdateCompanyDto,
) {
  const oldCompany =
    await this.findOne(id);

  const updatedCompany =
    await this.prisma.company.update({
      where: { id },
      data: dto,
    });

  await this.auditService.log(
    'Company',
    id,
    'UPDATE',
    oldCompany,
    updatedCompany,
  );

  return updatedCompany;
}

async remove(id: string) {
  const company =
    await this.findOne(id);

  await this.auditService.log(
    'Company',
    id,
    'DELETE',
    company,
    null,
  );

  return this.prisma.company.delete({
    where: { id },
  });
}
}