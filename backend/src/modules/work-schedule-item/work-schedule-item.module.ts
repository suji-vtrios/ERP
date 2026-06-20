import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { WorkScheduleItemService } from './work-schedule-item.service';
import { WorkScheduleItemController } from './work-schedule-item.controller';

@Module({
  imports: [PrismaModule],
  providers: [WorkScheduleItemService],
  controllers: [WorkScheduleItemController]
})
export class WorkScheduleItemModule {}
