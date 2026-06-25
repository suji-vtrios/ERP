import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { EmployeeLeaveBalanceService } from './employee-leave-balance.service';
import { EmployeeLeaveBalanceController } from './employee-leave-balance.controller';

@Module({
  imports: [PrismaModule],
  controllers: [EmployeeLeaveBalanceController],
  providers: [EmployeeLeaveBalanceService],
})
export class EmployeeLeaveBalanceModule {}