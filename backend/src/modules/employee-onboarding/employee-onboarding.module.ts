import { Module } from '@nestjs/common';
import { EmployeeOnboardingService } from './employee-onboarding.service';
import { EmployeeOnboardingController } from './employee-onboarding.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeOnboardingController],
  providers: [EmployeeOnboardingService],
})
export class EmployeeOnboardingModule {}
