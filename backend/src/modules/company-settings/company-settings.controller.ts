import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CompanySettingsService } from './company-settings.service';
import { CreateCompanySettingDto } from './dto/create-company-setting.dto';
import { UpdateCompanySettingDto } from './dto/update-company-setting.dto';

@ApiTags('Company Settings')
@Controller('company-settings')
export class CompanySettingsController {
  constructor(
    private readonly companySettingsService: CompanySettingsService,
  ) {}

  @Post()
  create(@Body() dto: CreateCompanySettingDto) {
    return this.companySettingsService.create(dto);
  }

  @Get('company/:companyId')
  findAllByCompany(@Param('companyId') companyId: string) {
    return this.companySettingsService.findAllByCompany(companyId);
  }

  @Get('company/:companyId/key/:settingKey')
  findByKey(
    @Param('companyId') companyId: string,
    @Param('settingKey') settingKey: string,
  ) {
    return this.companySettingsService.findByKey(
      companyId,
      settingKey,
    );
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.companySettingsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCompanySettingDto,
  ) {
    return this.companySettingsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companySettingsService.remove(id);
  }
}