import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateDesignationDto } from './dto/create-designation.dto';
import { UpdateDesignationDto } from './dto/update-designation.dto';

@Injectable()
export class DesignationService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateDesignationDto) {
    const designation =
      await this.prisma.designation.create({
        data: dto,
      });

    await this.auditService.log(
      'Designation',
      designation.id,
      'CREATE',
      null,
      designation,
    );

    return designation;
  }

  async findAll() {
    return this.prisma.designation.findMany({
      orderBy: {
        designationName: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const designation =
      await this.prisma.designation.findUnique({
        where: { id },
      });

    if (!designation) {
      throw new NotFoundException(
        'Designation not found',
      );
    }

    return designation;
  }

  async update(
    id: string,
    dto: UpdateDesignationDto,
  ) {
    const oldValue =
      await this.findOne(id);

    const designation =
      await this.prisma.designation.update({
        where: { id },
        data: dto,
      });

    await this.auditService.log(
      'Designation',
      id,
      'UPDATE',
      oldValue,
      designation,
    );

    return designation;
  }

  async remove(id: string) {
    const oldValue =
      await this.findOne(id);

    await this.auditService.log(
      'Designation',
      id,
      'DELETE',
      oldValue,
      null,
    );

    return this.prisma.designation.delete({
      where: { id },
    });
  }
}