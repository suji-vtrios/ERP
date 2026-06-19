import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async log(
    entityName: string,
    entityId: string,
    action: string,
    oldValue?: any,
    newValue?: any,
    userId?: string,
  ) {
    return this.prisma.auditLog.create({
      data: {
        entityName,
        entityId,
        action,
        oldValue,
        newValue,
        userId,
      },
    });
  }
}