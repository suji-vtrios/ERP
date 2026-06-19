import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateHrRequestTypeDto } from './dto/create-hr-request-type.dto';
import { UpdateHrRequestTypeDto } from './dto/update-hr-request-type.dto';

@Injectable()
export class HrRequestTypeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}

  async create(
    dto: CreateHrRequestTypeDto,
  ) {
    const requestType =
      await this.prisma.hrRequestType.create({
        data: dto,
      });

    await this.auditService.log(
      'HrRequestType',
      requestType.id,
      'CREATE',
      null,
      requestType,
    );

    return requestType;
  }

  async findAll() {
    return this.prisma.hrRequestType.findMany({
      include: {
        company: true,
      },
      orderBy: {
        requestName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const requestType =
      await this.prisma.hrRequestType.findUnique({
        where: { id },
      });

    if (!requestType) {
      throw new NotFoundException(
        'HR Request Type not found',
      );
    }

    return requestType;
  }

  async update(
    id: string,
    dto: UpdateHrRequestTypeDto,
  ) {
    await this.findOne(id);

    const updated =
      await this.prisma.hrRequestType.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'HrRequestType',
      id,
      'UPDATE',
      null,
      updated,
    );

    return updated;
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.hrRequestType.delete({
      where: { id },
    });
  }
}