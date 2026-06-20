import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { WorkLogLineService } from './work-log-line.service';

import { CreateWorkLogLineDto } from './dto/create-work-log-line.dto';
import { UpdateWorkLogLineDto } from './dto/update-work-log-line.dto';

@Controller('work-log-line')
export class WorkLogLineController {
  constructor(
    private readonly workLogLineService: WorkLogLineService,
  ) {}

  @Post()
  create(
    @Body() dto: CreateWorkLogLineDto,
  ) {
    return this.workLogLineService.create(dto);
  }

  @Get('header/:workLogHeaderId')
  findByHeader(
    @Param('workLogHeaderId')
    workLogHeaderId: string,
  ) {
    return this.workLogLineService.findByHeader(
      workLogHeaderId,
    );
  }

  
  @Get(':id')
  findById(
    @Param('id') id: string,
  ) {
    return this.workLogLineService.findById(id);
  }


    @Patch(':id')
    update(
    @Param('id') id: string,
    @Body() dto: UpdateWorkLogLineDto,
    ) {
    return this.workLogLineService.update(
        id,
        dto,
    );
    }

    @Delete(':id')
    remove(
    @Param('id') id: string,
    ) {
    return this.workLogLineService.remove(
        id,
    );
    }
}