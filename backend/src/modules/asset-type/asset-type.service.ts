import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

@Injectable()
export class AssetTypeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(dto: CreateAssetTypeDto) {
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

    const assetCategory =
      await this.prisma.assetCategory.findUnique({
        where: {
          id: dto.assetCategoryId,
        },
      });

    if (!assetCategory) {
      throw new NotFoundException(
        'Asset category not found',
      );
    }

    if (
      assetCategory.companyId !== dto.companyId
    ) {
      throw new BadRequestException(
        'Asset category does not belong to the selected company',
      );
    }

    const existingCode =
      await this.prisma.assetType.findFirst({
        where: {
          companyId: dto.companyId,
          assetTypeCode: dto.assetTypeCode,
        },
      });

    if (existingCode) {
      throw new BadRequestException(
        'Asset type code already exists',
      );
    }

    const existingName =
      await this.prisma.assetType.findFirst({
        where: {
          companyId: dto.companyId,
          assetTypeName: dto.assetTypeName,
        },
      });

    if (existingName) {
      throw new BadRequestException(
        'Asset type name already exists',
      );
    }

    const assetType =
      await this.prisma.assetType.create({
        data: dto,
      });

    await this.auditService.log(
      'Asset Type',
      assetType.id,
      'CREATE',
      null,
      assetType,
    );

    return assetType;
  }

  async findAll(
    companyId?: string,
    assetCategoryId?: string,
  ) {
    return this.prisma.assetType.findMany({
      where: {
        ...(companyId && { companyId }),
        ...(assetCategoryId && { assetCategoryId }),
      },

      include: {
        company: true,
        assetCategory: true,
      },

      orderBy: {
        assetTypeName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const assetType =
      await this.prisma.assetType.findUnique({
        where: { id },
        include: {
          company: true,
          assetCategory: true,
        },
      });

    if (!assetType) {
      throw new NotFoundException(
        'Asset type not found',
      );
    }

    return assetType;
  }

  async update(
    id: string,
    dto: UpdateAssetTypeDto,
  ) {
    const oldAssetType =
      await this.findOne(id);

    const updatedAssetType =
      await this.prisma.assetType.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Asset Type',
      id,
      'UPDATE',
      oldAssetType,
      updatedAssetType,
    );

    return updatedAssetType;
  }

  async remove(id: string) {
    const assetType =
      await this.findOne(id);

    await this.auditService.log(
      'Asset Type',
      id,
      'DELETE',
      assetType,
      null,
    );

    return this.prisma.assetType.delete({
      where: { id },
    });
  }
}