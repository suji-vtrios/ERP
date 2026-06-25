import {
  Controller,
  Get,
  Post,
  Body,
  Param,
} from '@nestjs/common';

import { EmployeeClearanceService } from './employee-clearance.service';

import { CreateEmployeeClearanceDto } from './dto/create-employee-clearance.dto';

import { ClearanceItemActionDto } from './dto/clearance-item-action.dto';

@Controller('employee-clearance')
export class EmployeeClearanceController {
  constructor(
    private readonly employeeClearanceService: EmployeeClearanceService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateEmployeeClearanceDto,
  ) {
    return this.employeeClearanceService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.employeeClearanceService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.employeeClearanceService.findOne(
      id,
    );
  }

  @Post('item/:itemId/clear')
  clearItem(
    @Param('itemId')
    itemId: string,

    @Body()
    dto: ClearanceItemActionDto,
  ) {
    return this.employeeClearanceService.clearItem(
      itemId,
      dto,
    );
  }

  @Post(':id/complete')
  complete(
    @Param('id')
    id: string,
  ) {
    return this.employeeClearanceService.complete(
      id,
    );
  }
}