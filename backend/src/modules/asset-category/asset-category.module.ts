import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { AssetCategoryController } from './asset-category.controller';
import { AssetCategoryService } from './asset-category.service';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [
    AssetCategoryController,
  ],
  providers: [
    AssetCategoryService,
  ],
})
export class AssetCategoryModule {}