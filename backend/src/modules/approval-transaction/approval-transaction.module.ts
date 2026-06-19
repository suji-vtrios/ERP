import { Module } from '@nestjs/common';

import { ApprovalTransactionController } from './approval-transaction.controller';
import { ApprovalTransactionService } from './approval-transaction.service';

import { PrismaModule } from '../../prisma/prisma.module';
import { AuditModule } from '../audit/audit.module';

import { DocumentGeneratorModule }
  from '../document-generator/document-generator.module';

@Module({
  imports: [
    PrismaModule,
    AuditModule,
    DocumentGeneratorModule,
  ],

  controllers: [
    ApprovalTransactionController,
  ],

  providers: [
    ApprovalTransactionService,
  ],

  exports: [
    ApprovalTransactionService,
  ],
})
export class ApprovalTransactionModule {}