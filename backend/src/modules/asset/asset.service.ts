import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(
      private readonly prisma: PrismaService,
      private readonly auditService: AuditService,
    ) {}
  async create(dto: CreateAssetDto) {
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

    if (dto.branchId) {
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

      if (branch.companyId !== dto.companyId) {
        throw new BadRequestException(
          'Branch does not belong to the selected company',
        );
      }
    }
    const assetType =
      await this.prisma.assetType.findUnique({
        where: {
          id: dto.assetTypeId,
        },
      });

    if (!assetType) {
      throw new BadRequestException(
        'Asset type not found',
      );
    }
    if (
  assetType.companyId !== dto.companyId
    ) {
      throw new BadRequestException(
        'Asset type does not belong to the selected company',
      );
    }

    const exists =
      await this.prisma.asset.findFirst({
        where: {
          companyId: dto.companyId,
          assetCode: dto.assetCode,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Asset code already exists for this company',
      );
    }

    const asset =
      await this.prisma.asset.create({
        data: {
          companyId: dto.companyId,

          branchId: dto.branchId,

          assetCode: dto.assetCode,

          assetName: dto.assetName,

          assetTypeId: dto.assetTypeId,

          serialNumber: dto.serialNumber,

          manufacturer: dto.manufacturer,

          modelNumber: dto.modelNumber,

          purchaseDate: dto.purchaseDate
            ? new Date(dto.purchaseDate)
            : null,

          purchaseCost: dto.purchaseCost,

          currency: dto.currency,

          warrantyExpiry: dto.warrantyExpiry
            ? new Date(dto.warrantyExpiry)
            : null,

          location: dto.location,

          remarks: dto.remarks,

          isActive: dto.isActive ?? true,

          status: 'AVAILABLE',
        },
      });
      await this.auditService.log(
        'Asset',
        asset.id,
        'CREATE',
        null,
        asset,
      );

      return asset;    
  }
  
  async findAll() {
    return this.prisma.asset.findMany({
      include: {
        company: true,

        branch: true,

        assetType: {
          include: {
            assetCategory: true,
          },
        },

        employeeAssets: true,
      },
      orderBy: {
        assetName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const asset =
      await this.prisma.asset.findUnique({
        where: {
          id,
        },
        include: {
          company: true,

          branch: true,

          assetType: {
            include: {
              assetCategory: true,
            },
          },

          employeeAssets: true,
        },
      });

    if (!asset) {
      throw new NotFoundException(
        'Asset not found',
      );
    }

    return asset;
  }

  async update(
    id: string,
    dto: UpdateAssetDto,
  ) {
    const oldAsset =
      await this.findOne(id);

    const updatedAsset =
      await this.prisma.asset.update({
        where: {
          id,
        },
        data: dto,
      });

    await this.auditService.log(
      'Asset',
      id,
      'UPDATE',
      oldAsset,
      updatedAsset,
    );

    return updatedAsset;
  }

  async remove(id: string) {
    const asset =
      await this.findOne(id);

    const assigned =
      await this.prisma.employeeAsset.findFirst({
        where: {
          assetId: id,
          returnedDate: null,
        },
      });

    if (assigned) {
      throw new BadRequestException(
        'Asset currently assigned to an employee',
      );
    }

    await this.auditService.log(
      'Asset',
      id,
      'DELETE',
      asset,
      null,
    );

    return this.prisma.asset.delete({
      where: {
        id,
      },
    });
  }
}
