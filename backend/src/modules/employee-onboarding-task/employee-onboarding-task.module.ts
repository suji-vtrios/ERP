import { Module } from '@nestjs/common';
import { EmployeeOnboardingTaskService } from './employee-onboarding-task.service';
import { EmployeeOnboardingTaskController } from './employee-onboarding-task.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeOnboardingTaskController],
  providers: [EmployeeOnboardingTaskService],
})
export class EmployeeOnboardingTaskModule {}
