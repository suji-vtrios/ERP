import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { AssetController } from './asset.controller';
import { AssetService } from './asset.service';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [AssetController],
  providers: [AssetService],
})
export class AssetModule {}