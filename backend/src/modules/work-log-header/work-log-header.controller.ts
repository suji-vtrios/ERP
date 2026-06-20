import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { WorkLogHeaderService } from './work-log-header.service';

import { CreateWorkLogHeaderDto } from './dto/create-work-log-header.dto';
import { UpdateWorkLogHeaderDto } from './dto/update-work-log-header.dto';

@Controller('work-log-header')
export class WorkLogHeaderController {
  constructor(
    private readonly workLogHeaderService: WorkLogHeaderService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateWorkLogHeaderDto,
  ) {
    return this.workLogHeaderService.create(dto);
  }

  @Get('employee/:employeeId')
  findAllByEmployee(
    @Param('employeeId') employeeId: string,
  ) {
    return this.workLogHeaderService.findAllByEmployee(
      employeeId,
    );
  }

  @Get(':id')
  findById(
    @Param('id') id: string,
  ) {
    return this.workLogHeaderService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkLogHeaderDto,
  ) {
    return this.workLogHeaderService.update(
      id,
      dto,
    );
  }

  @Post(':id/submit')
  submit(
    @Param('id') id: string,
  ) {
    return this.workLogHeaderService.submit(id);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    return this.workLogHeaderService.remove(id);
  }
}