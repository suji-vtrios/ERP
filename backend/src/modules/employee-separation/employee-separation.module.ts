import { Module } from '@nestjs/common';

import { EmployeeSeparationController } from './employee-separation.controller';
import { EmployeeSeparationService } from './employee-separation.service';

import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [
    EmployeeSeparationController,
  ],
  providers: [
    EmployeeSeparationService,
  ],
})
export class EmployeeSeparationModule {}