import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { EmployeeAssetController } from './employee-asset.controller';
import { EmployeeAssetService } from './employee-asset.service';


@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [EmployeeAssetController],
  providers: [EmployeeAssetService],
})
export class EmployeeAssetModule {}
