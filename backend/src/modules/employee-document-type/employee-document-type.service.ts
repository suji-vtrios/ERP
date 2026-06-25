import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateEmployeeDocumentTypeDto } from './dto/create-employee-document-type.dto';
import { UpdateEmployeeDocumentTypeDto } from './dto/update-employee-document-type.dto';

@Injectable()
export class EmployeeDocumentTypeService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
  async create(
    dto: CreateEmployeeDocumentTypeDto,
  ) {
    const exists =
      await this.prisma.employeeDocumentType.findFirst({
        where: {
          companyId: dto.companyId,
          documentCode: dto.documentCode.toUpperCase(),
        },
      });

    if (exists) {
      throw new BadRequestException(
        'Document type already exists',
      );
    }

    return this.prisma.employeeDocumentType.create({
      data: {
        companyId: dto.companyId,
        documentCode: dto.documentCode,
        documentName: dto.documentName,
        isMandatory: dto.isMandatory ?? false,
      },
    });
  }

  async findAll() {
    return this.prisma.employeeDocumentType.findMany({
      orderBy: {
        documentName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const documentType =
      await this.prisma.employeeDocumentType.findUnique({
        where: { id },
      });

    if (!documentType) {
      throw new NotFoundException(
        'Document type not found',
      );
    }

    return documentType;
  }

  async update(
    id: string,
    dto: UpdateEmployeeDocumentTypeDto,
  ) {
    await this.findOne(id);

    return this.prisma.employeeDocumentType.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employeeDocumentType.delete({
      where: { id },
    });
  }
}
