import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateEmployeeDocumentDto } from './dto/create-employee-document.dto';
import { UpdateEmployeeDocumentDto } from './dto/update-employee-document.dto';

@Injectable()
export class EmployeeDocumentService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateEmployeeDocumentDto,
  ) {
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: dto.employeeId,
        },
      });

    if (!employee) {
      throw new BadRequestException(
        'Employee not found',
      );
    }

    const documentType =
      await this.prisma.employeeDocumentType.findUnique({
        where: {
          id: dto.documentTypeId,
        },
      });

    if (!documentType) {
      throw new BadRequestException(
        'Document type not found',
      );
    }

    return this.prisma.employeeDocument.create({
      data: {
        employeeId: dto.employeeId,
        documentTypeId: dto.documentTypeId,
        documentNumber: dto.documentNumber,
        issueDate: dto.issueDate
          ? new Date(dto.issueDate)
          : null,
        expiryDate: dto.expiryDate
          ? new Date(dto.expiryDate)
          : null,
        filePath: dto.filePath,
        remarks: dto.remarks,
        status: 'ACTIVE',
      },
    });
  }

  async findAll() {
    return this.prisma.employeeDocument.findMany({
      include: {
        employee: true,
        documentType: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const document =
      await this.prisma.employeeDocument.findUnique({
        where: { id },
        include: {
          employee: true,
          documentType: true,
        },
      });

    if (!document) {
      throw new NotFoundException(
        'Document not found',
      );
    }

    return document;
  }

  async findByEmployee(
    employeeId: string,
  ) {
    return this.prisma.employeeDocument.findMany({
      where: {
        employeeId,
      },
      include: {
        documentType: true,
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  async getExpiredDocuments() {
    const today = new Date();

    return this.prisma.employeeDocument.findMany({
      where: {
        expiryDate: {
          lt: today,
        },
      },
      include: {
        employee: true,
        documentType: true,
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  async getExpiringDocuments(
    days: number,
  ) {
    const today = new Date();

    const futureDate = new Date();

    futureDate.setDate(
      futureDate.getDate() + days,
    );

    return this.prisma.employeeDocument.findMany({
      where: {
        expiryDate: {
          gte: today,
          lte: futureDate,
        },
      },
      include: {
        employee: true,
        documentType: true,
      },
      orderBy: {
        expiryDate: 'asc',
      },
    });
  }

  async getEmployeeDocuments(
    employeeId: string,
  ) {
    const employee =
      await this.prisma.employee.findUnique({
        where: {
          id: employeeId,
        },
      });

    if (!employee) {
      throw new NotFoundException(
        'Employee not found',
      );
    }

    const documents =
      await this.prisma.employeeDocument.findMany({
        where: {
          employeeId,
        },
        include: {
          documentType: true,
        },
        orderBy: {
          expiryDate: 'asc',
        },
      });

    return {
      employee,
      documents,
    };
  }

  async update(
    id: string,
    dto: UpdateEmployeeDocumentDto,
  ) {
    await this.findOne(id);

    return this.prisma.employeeDocument.update({
      where: {
        id,
      },
      data: {
        ...dto,
        issueDate: dto.issueDate
          ? new Date(dto.issueDate)
          : undefined,
        expiryDate: dto.expiryDate
          ? new Date(dto.expiryDate)
          : undefined,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.employeeDocument.delete({
      where: {
        id,
      },
    });
  }
}
