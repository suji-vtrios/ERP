import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { TaskWorkSessionService } from './task-work-session.service';
import { TaskWorkSessionController } from './task-work-session.controller';
import { WorkLogHeaderModule } from '../work-log-header/work-log-header.module';

@Module({
  imports: [
    PrismaModule,
    WorkLogHeaderModule,
  ],
  providers: [
    TaskWorkSessionService,
  ],
  controllers: [
    TaskWorkSessionController,
  ],
})
export class TaskWorkSessionModule {}