import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
} from '@nestjs/common';

import { AttendanceService } from './attendance.service';

import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceFilterDto } from './dto/attendance-filter.dto';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
  ) {}

  @Post()
  create(
    @Body()
    dto: CreateAttendanceDto,
  ) {
    return this.attendanceService.create(
      dto,
    );
  }

  @Get()
  findAll(
    @Query()
    filters: AttendanceFilterDto,
  ) {
    return this.attendanceService.findAll(
      filters,
    );
  }

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.attendanceService.findOne(
      id,
    );
  }

  @Post('check-in')
    checkIn(
    @Body()
    dto: CheckInDto,
    ) {
    return this.attendanceService.checkIn(
        dto,
    );
    }

  @Post('check-out')
    checkOut(
    @Body()
    dto: CheckOutDto,
    ) {
    return this.attendanceService.checkOut(
        dto,
    );
    }
}