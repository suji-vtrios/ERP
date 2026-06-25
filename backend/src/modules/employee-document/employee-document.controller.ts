import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { EmployeeDocumentService } from './employee-document.service';

import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';
import { Query } from '@nestjs/common';

@Controller('employee-document')
export class EmployeeDocumentController {
  constructor(
    private readonly employeeDocumentService: EmployeeDocumentService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateEmployeeDocumentDto,
  ) {
    return this.employeeDocumentService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.employeeDocumentService.findAll();
  }

  @Get('expired')
  getExpiredDocuments() {
    return this.employeeDocumentService.getExpiredDocuments();
  }

  @Get('expiring')
  getExpiringDocuments(
    @Query('days') days: string,
  ) {
    return this.employeeDocumentService.getExpiringDocuments(
      Number(days || 30),
    );
  }

  @Get('employee/:employeeId')
  getEmployeeDocuments(
    @Param('employeeId')
    employeeId: string,
  ) {
    return this.employeeDocumentService.getEmployeeDocuments(
      employeeId,
    );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.employeeDocumentService.findOne(
      id,
    );
  }

  @Get('employee/:employeeId')
  findByEmployee(
    @Param('employeeId')
    employeeId: string,
  ) {
    return this.employeeDocumentService.findByEmployee(
      employeeId,
    );
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateEmployeeDocumentDto,
  ) {
    return this.employeeDocumentService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.employeeDocumentService.remove(
      id,
    );
  }
}