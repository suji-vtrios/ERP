import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common';

import { AssetTypeService } from './asset-type.service';

import { CreateAssetTypeDto } from './dto/create-asset-type.dto';
import { UpdateAssetTypeDto } from './dto/update-asset-type.dto';

@Controller('asset-types')
export class AssetTypeController {
  constructor(
    private readonly assetTypeService: AssetTypeService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateAssetTypeDto,
  ) {
    return this.assetTypeService.create(dto);
  }

  @Get()
  findAll() {
    return this.assetTypeService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.assetTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateAssetTypeDto,
  ) {
    return this.assetTypeService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.assetTypeService.remove(id);
  }
}