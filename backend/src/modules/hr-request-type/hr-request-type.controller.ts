import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HrRequestTypeService } from './hr-request-type.service';
import { CreateHrRequestTypeDto } from './dto/create-hr-request-type.dto';
import { UpdateHrRequestTypeDto } from './dto/update-hr-request-type.dto';

@Controller('hr-request-type')
export class HrRequestTypeController {
  constructor(private readonly hrRequestTypeService: HrRequestTypeService) {}

  @Post()
  create(@Body() createHrRequestTypeDto: CreateHrRequestTypeDto) {
    return this.hrRequestTypeService.create(createHrRequestTypeDto);
  }

  @Get()
  findAll() {
    return this.hrRequestTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hrRequestTypeService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateHrRequestTypeDto,
  ) {
    return this.hrRequestTypeService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hrRequestTypeService.remove(id);
  }
}
