import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';

import { EmployeeLeaveBalanceService } from './employee-leave-balance.service';

import { CreateEmployeeLeaveBalanceDto } from './dto/create-employee-leave-balance.dto';
import { UpdateEmployeeLeaveBalanceDto } from './dto/update-employee-leave-balance.dto';
import { EmployeeLeaveBalanceFilterDto } from './dto/employee-leave-balance-filter.dto';

@ApiTags('Employee Leave Balance')
@Controller('employee-leave-balances')
export class EmployeeLeaveBalanceController {
  constructor(
    private readonly employeeLeaveBalanceService: EmployeeLeaveBalanceService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateEmployeeLeaveBalanceDto,
  ) {
    return this.employeeLeaveBalanceService.create(dto);
  }

  @Get()
  findAll(
    @Query()
    filters: EmployeeLeaveBalanceFilterDto,
  ) {
    return this.employeeLeaveBalanceService.findAll(filters);
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.employeeLeaveBalanceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe)
    id: string,

    @Body()
    dto: UpdateEmployeeLeaveBalanceDto,
  ) {
    return this.employeeLeaveBalanceService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe)
    id: string,
  ) {
    return this.employeeLeaveBalanceService.remove(id);
  }
}