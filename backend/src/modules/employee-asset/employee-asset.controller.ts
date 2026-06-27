import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CreateEmployeeAssetDto } from './dto/create-employee-asset.dto';
import { ReturnAssetDto } from './dto/return-asset.dto';
import { EmployeeAssetService } from './employee-asset.service';

@Controller('employee-assets')
export class EmployeeAssetController {
  constructor(
    private readonly employeeAssetService: EmployeeAssetService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateEmployeeAssetDto,
  ) {
    return this.employeeAssetService.create(dto);
  }

  @Get()
  findAll() {
    return this.employeeAssetService.findAll();
  }

  @Get('employee/:employeeId')
  findByEmployee(
    @Param('employeeId')
    employeeId: string,
  ) {
    return this.employeeAssetService.findByEmployee(
      employeeId,
    );
  }

  @Get('asset/:assetId')
  findByAsset(
    @Param('assetId')
    assetId: string,
  ) {
    return this.employeeAssetService.findByAsset(
      assetId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.employeeAssetService.findOne(id);
  }

  @Patch(':id/return')
  returnAsset(
    @Param('id') id: string,
    @Body() dto: ReturnAssetDto,
  ) {
    return this.employeeAssetService.returnAsset(
      id,
      dto,
    );
  }
}
