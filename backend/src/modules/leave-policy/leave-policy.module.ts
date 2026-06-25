import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';

import { LeavePolicyController } from './leave-policy.controller';
import { LeavePolicyService } from './leave-policy.service';

@Module({
  imports: [PrismaModule],
  controllers: [LeavePolicyController],
  providers: [LeavePolicyService],
})
export class LeavePolicyModule {}