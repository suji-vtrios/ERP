import { Module } from '@nestjs/common';
import { EmployeeClearanceService } from './employee-clearance.service';
import { EmployeeClearanceController } from './employee-clearance.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EmployeeClearanceController],
  providers: [
    EmployeeClearanceService,
    PrismaService,
  ],
})
export class EmployeeClearanceModule {}
