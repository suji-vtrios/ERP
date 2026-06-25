import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
} from '@nestjs/common';

import { ShiftService } from './shift.service';

import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';

@Controller('shifts')
export class ShiftController {
  constructor(
    private readonly shiftService: ShiftService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateShiftDto,
  ) {
    return this.shiftService.create(
      dto,
    );
  }

  @Get()
  findAll() {
    return this.shiftService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.shiftService.findOne(
      id,
    );
  }

  @Patch(':id')
  update(
    @Param('id')
    id: string,
    @Body()
    dto: UpdateShiftDto,
  ) {
    return this.shiftService.update(
      id,
      dto,
    );
  }
}