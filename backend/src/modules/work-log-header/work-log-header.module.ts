import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { WorkLogHeaderController } from './work-log-header.controller';
import { WorkLogHeaderService } from './work-log-header.service';

@Module({
  imports: [PrismaModule],
  providers: [WorkLogHeaderService],
  controllers: [WorkLogHeaderController],
  exports: [WorkLogHeaderService],
})
export class WorkLogHeaderModule {}