import { Module } from '@nestjs/common';
import { EmployeeDocumentTypeService } from './employee-document-type.service';
import { EmployeeDocumentTypeController } from './employee-document-type.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [
    EmployeeDocumentTypeController,
  ],
  providers: [
    EmployeeDocumentTypeService,
    PrismaService,
  ],
})
export class EmployeeDocumentTypeModule {}
