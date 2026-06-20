import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { WorkLogHeaderModule } from '../work-log-header/work-log-header.module';

import { WorkLogLineController } from './work-log-line.controller';
import { WorkLogLineService } from './work-log-line.service';

@Module({
  imports: [
    PrismaModule,
    WorkLogHeaderModule,
  ],
  controllers: [
    WorkLogLineController,
  ],
  providers: [
    WorkLogLineService,
  ],
  exports: [
    WorkLogLineService,
  ],
})
export class WorkLogLineModule {}