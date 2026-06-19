import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { HrRequestService } from './hr-request.service';
import { CreateHrRequestDto } from './dto/create-hr-request.dto';


@ApiTags('HR Requests')
@Controller('hr-requests')
export class HrRequestController {
  constructor(
    private readonly hrRequestService: HrRequestService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create HR Request',
  })
  create(
    @Body() dto: CreateHrRequestDto,
  ) {
    return this.hrRequestService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get All HR Requests',
  })
  findAll() {
    return this.hrRequestService.findAll();
  }
}