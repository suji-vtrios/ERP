import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { AssetTypeController } from './asset-type.controller';
import { AssetTypeService } from './asset-type.service';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [AssetTypeController],
  providers: [AssetTypeService],
})
export class AssetTypeModule {}