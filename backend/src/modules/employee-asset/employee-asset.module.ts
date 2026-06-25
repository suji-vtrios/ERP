import { Module } from '@nestjs/common';
import { EmployeeAssetService } from './employee-asset.service';
import { EmployeeAssetController } from './employee-asset.controller';

@Module({
  controllers: [EmployeeAssetController],
  providers: [EmployeeAssetService],
})
export class EmployeeAssetModule {}
