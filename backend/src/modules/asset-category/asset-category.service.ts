import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateAssetCategoryDto } from './dto/create-asset-category.dto';
import { UpdateAssetCategoryDto } from './dto/update-asset-category.dto';

@Injectable()
export class AssetCategoryService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(
    dto: CreateAssetCategoryDto,
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

    const existingCode =
      await this.prisma.assetCategory.findFirst({
        where: {
          companyId: dto.companyId,
          assetCategoryCode:
            dto.assetCategoryCode,
        },
      });

    if (existingCode) {
      throw new ConflictException(
        'Asset category code already exists.',
      );
    }

    const existingName =
      await this.prisma.assetCategory.findFirst({
        where: {
          companyId: dto.companyId,
          assetCategoryName:
            dto.assetCategoryName,
        },
      });

    if (existingName) {
      throw new ConflictException(
        'Asset category name already exists.',
      );
    }

    const assetCategory =
      await this.prisma.assetCategory.create({
        data: dto,
      });

    await this.auditService.log(
      'Asset Category',
      assetCategory.id,
      'CREATE',
      null,
      assetCategory,
    );

    return assetCategory;
  }

  async findAll(companyId?: string) {
    return this.prisma.assetCategory.findMany({
      where: companyId
        ? {
            companyId,
          }
        : undefined,

      include: {
        company: true,
      },

      orderBy: {
        assetCategoryName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const assetCategory =
      await this.prisma.assetCategory.findUnique({
        where: { id },

        include: {
          company: true,
        },
      });

    if (!assetCategory) {
      throw new NotFoundException(
        'Asset category not found',
      );
    }

    return assetCategory;
  }

  async update(
    id: string,
    dto: UpdateAssetCategoryDto,
  ) {
    const oldAssetCategory =
      await this.findOne(id);

    const updatedAssetCategory =
      await this.prisma.assetCategory.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Asset Category',
      id,
      'UPDATE',
      oldAssetCategory,
      updatedAssetCategory,
    );

    return updatedAssetCategory;
  }

  async remove(id: string) {
    const assetCategory =
      await this.findOne(id);

    await this.auditService.log(
      'Asset Category',
      id,
      'DELETE',
      assetCategory,
      null,
    );

    return this.prisma.assetCategory.delete({
      where: { id },
    });
  }
}