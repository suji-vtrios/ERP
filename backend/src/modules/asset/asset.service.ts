import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Injectable()
export class AssetService {
  constructor(
      private readonly prisma: PrismaService,
    ) {}
  async create(dto: CreateAssetDto) {
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

    const exists =
      await this.prisma.asset.findUnique({
        where: {
          assetCode: dto.assetCode,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Asset code already exists',
      );
    }

    return this.prisma.asset.create({
      data: {
        companyId: dto.companyId,
        assetCode: dto.assetCode,
        assetName: dto.assetName,
        assetTypeId: dto.assetTypeId,
        serialNumber: dto.serialNumber,
        purchaseDate: dto.purchaseDate
          ? new Date(dto.purchaseDate)
          : null,
        status: 'AVAILABLE',
      },
    });
  }
  async findAll() {
    return this.prisma.asset.findMany({
      include: {
        assetType: true,
      },
      orderBy: {
        assetName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const asset =
      await this.prisma.asset.findUnique({
        where: { id },
        include: {
          assetType: true,
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
    await this.findOne(id);

    return this.prisma.asset.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const assigned =
      await this.prisma.employeeAsset.findFirst({
        where: {
          assetId: id,
          status: 'ASSIGNED',
        },
      });

    if (assigned) {
      throw new BadRequestException(
        'Asset currently assigned to employee',
      );
    }

    return this.prisma.asset.delete({
      where: { id },
    });
  }
}
