import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EmployeeOnboardingTaskService } from './employee-onboarding-task.service';
import { CreateEmployeeOnboardingTaskDto } from './dto/create-employee-onboarding-task.dto';
import { UpdateEmployeeOnboardingTaskDto } from './dto/update-employee-onboarding-task.dto';
import { CompleteOnboardingTaskDto } from './dto/complete-onboarding-task.dto';

@Controller('employee-onboarding-task')
export class EmployeeOnboardingTaskController {
  constructor(private readonly employeeOnboardingTaskService: EmployeeOnboardingTaskService) {}

  @Post(':id/complete')
  completeTask(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CompleteOnboardingTaskDto,
  ) {
    return this.employeeOnboardingTaskService.completeTask(
      id,
      dto,
    );
  }

  @Post(':id/reopen')
  reopenTask(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.employeeOnboardingTaskService.reopenTask(
      id,
    );
  }
 
}
