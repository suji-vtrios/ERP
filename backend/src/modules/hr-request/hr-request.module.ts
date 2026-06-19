import { Module } from '@nestjs/common';
import { HrRequestService } from './hr-request.service';
import { HrRequestController } from './hr-request.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
  ],
  controllers: [
    HrRequestController,
  ],
  providers: [
    HrRequestService,
  ],
})
export class HrRequestModule {}