import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AssetCategoryService } from './asset-category.service';

import { CreateAssetCategoryDto } from './dto/create-asset-category.dto';
import { UpdateAssetCategoryDto } from './dto/update-asset-category.dto';

@ApiTags('Asset Categories')
@Controller('asset-categories')
export class AssetCategoryController {
  constructor(
    private readonly assetCategoryService: AssetCategoryService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create Asset Category',
  })
  create(
    @Body()
    dto: CreateAssetCategoryDto,
  ) {
    return this.assetCategoryService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All Asset Categories',
  })
  findAll(
    @Query('companyId') companyId?: string,
  ) {
    return this.assetCategoryService.findAll(
      companyId,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get Asset Category By Id',
  })
  findOne(
    @Param('id') id: string,
  ) {
    return this.assetCategoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update Asset Category',
  })
  update(
    @Param('id') id: string,
    @Body()
    dto: UpdateAssetCategoryDto,
  ) {
    return this.assetCategoryService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete Asset Category',
  })
  remove(
    @Param('id') id: string,
  ) {
    return this.assetCategoryService.remove(id);
  }
}