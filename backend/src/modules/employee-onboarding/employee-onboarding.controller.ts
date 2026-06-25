import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EmployeeOnboardingService } from './employee-onboarding.service';
import { CreateEmployeeOnboardingDto } from './dto/create-employee-onboarding.dto';
import { UpdateEmployeeOnboardingDto } from './dto/update-employee-onboarding.dto';

@Controller('employee-onboarding')
export class EmployeeOnboardingController {
  constructor(private readonly employeeOnboardingService: EmployeeOnboardingService) {}

  @Post()
  create(@Body() createEmployeeOnboardingDto: CreateEmployeeOnboardingDto) {
    return this.employeeOnboardingService.create(createEmployeeOnboardingDto);
  }

  @Get()
  findAll() {
    return this.employeeOnboardingService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.employeeOnboardingService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateEmployeeOnboardingDto,
  ) {
    return this.employeeOnboardingService.update(
      id,
      dto,
    );
  }

  @Delete(':id')
  remove(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.employeeOnboardingService.remove(id);
  }

  @Post(':id/complete')
  completeOnboarding(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.employeeOnboardingService.completeOnboarding(
      id,
    );
  }
}
