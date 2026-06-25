import { Module } from '@nestjs/common';
import { EmployeeDocumentService } from './employee-document.service';
import { EmployeeDocumentController } from './employee-document.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [EmployeeDocumentController],
  providers: [
    EmployeeDocumentService,
    PrismaService,
  ]
})
export class EmployeeDocumentModule {}
