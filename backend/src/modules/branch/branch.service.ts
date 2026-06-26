import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService }
from '../../prisma/prisma.service';

import { AuditService }
from '../audit/audit.service';

import { CreateBranchDto }
from './dto/create-branch.dto';

import { UpdateBranchDto }
from './dto/update-branch.dto';

@Injectable()
export class BranchService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(
    dto: CreateBranchDto,
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
      await this.prisma.branch.create({
        data: dto,
      });

    await this.auditService.log(
      'Branch',
      branch.id,
      'CREATE',
      null,
      branch,
    );

    return branch;
  }

  async findAll(companyId?: string) {
    return this.prisma.branch.findMany({
      where: companyId
        ? { companyId }
        : undefined,

      orderBy: {
        branchName: "asc",
      },
    });
  }

  async findOne(id: string) {
    const branch =
      await this.prisma.branch.findUnique({
        where: { id },
        include: {
          company: true,
        },
      });

    if (!branch) {
      throw new NotFoundException(
        'Branch not found',
      );
    }

    return branch;
  }

  async update(
    id: string,
    dto: UpdateBranchDto,
  ) {
    const oldBranch =
      await this.findOne(id);

    const updatedBranch =
      await this.prisma.branch.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Branch',
      id,
      'UPDATE',
      oldBranch,
      updatedBranch,
    );

    return updatedBranch;
  }

  async remove(id: string) {
    const branch =
      await this.findOne(id);

    await this.auditService.log(
      'Branch',
      id,
      'DELETE',
      branch,
      null,
    );

    return this.prisma.branch.delete({
      where: { id },
    });
  }
}