import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { EmployeeSeparationService } from './employee-separation.service';

import { CreateEmployeeSeparationDto } from './dto/create-employee-separation.dto';
import { SeparationFilterDto } from './dto/separation-filter.dto';
import { ProcessSeparationDto } from './dto/process-separation.dto';
import { CompleteSeparationDto } from './dto/complete-separation.dto';

@Controller('employee-separations')
export class EmployeeSeparationController {
  constructor(
    private readonly employeeSeparationService: EmployeeSeparationService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateEmployeeSeparationDto,
  ) {
    return this.employeeSeparationService.create(
      dto,
    );
  }

  @Get()
  findAll(
    @Query()
    filters: SeparationFilterDto,
  ) {
    return this.employeeSeparationService.findAll(
      filters,
    );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.employeeSeparationService.findOne(
      id,
    );
  }

  @Post('process')
    process(
    @Body()
    dto: ProcessSeparationDto,
    ) {
    return this.employeeSeparationService.process(
        dto,
    );
    }

  @Post('complete')
    complete(
    @Body()
    dto: CompleteSeparationDto,
    ) {
    return this.employeeSeparationService.complete(
        dto,
    );
    }
}