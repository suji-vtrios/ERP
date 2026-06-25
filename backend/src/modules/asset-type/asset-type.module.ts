import { Module } from '@nestjs/common';
import { AssetTypeService } from './asset-type.service';
import { AssetTypeController } from './asset-type.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AssetTypeController],
  providers: [AssetTypeService],
})
export class AssetTypeModule {}
