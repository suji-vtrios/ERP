import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

@Injectable()
export class AssetTypeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateAssetTypeDto) {
    const exists =
      await this.prisma.assetType.findFirst({
        where: {
          companyId: dto.companyId,
          assetTypeCode: dto.assetTypeCode,
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Asset type code already exists',
      );
    }

    return this.prisma.assetType.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.assetType.findMany({
      orderBy: {
        assetTypeName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const assetType =
      await this.prisma.assetType.findUnique({
        where: { id },
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
    await this.findOne(id);

    return this.prisma.assetType.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.assetType.delete({
      where: { id },
    });
  }
}