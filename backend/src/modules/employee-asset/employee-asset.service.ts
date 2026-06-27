import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { AuditService } from '../audit/audit.service';

import { CreateEmployeeAssetDto } from './dto/create-employee-asset.dto';
import { ReturnAssetDto } from './dto/return-asset.dto';


@Injectable()
export class EmployeeAssetService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly auditService: AuditService,
  ) {}
  async create(
    dto: CreateEmployeeAssetDto,
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

    const asset =
      await this.prisma.asset.findUnique({
        where: {
          id: dto.assetId,
        },
      });

    if (!asset) {
      throw new BadRequestException(
        'Asset not found',
      );
    }

    if (asset.status !== 'AVAILABLE') {
      throw new BadRequestException(
        'Asset is not available for assignment',
      );
    }

    const activeAssignment =
      await this.prisma.employeeAsset.findFirst({
        where: {
          assetId: dto.assetId,
          returnedDate: null,
        },
      });

    if (activeAssignment) {
      throw new BadRequestException(
        'Asset already assigned',
      );
    }

    const assignment =
      await this.prisma.employeeAsset.create({
        data: {
          employeeId: dto.employeeId,
          assetId: dto.assetId,
          assignedDate: new Date(
            dto.assignedDate,
          ),
          remarks: dto.remarks,
          status: 'ASSIGNED',
        },
      });

    await this.prisma.asset.update({
      where: {
        id: dto.assetId,
      },
      data: {
        status: 'ASSIGNED',
        location: 'Assigned to Employee',
      },
    });

    await this.auditService.log(
      'Employee Asset',
      assignment.id,
      'CREATE',
      null,
      assignment,
    );

    return assignment;
  }
  async findAll() {
    return this.prisma.employeeAsset.findMany({
      include: {
          employee: {
              include: {
                  company: true,
                  branch: true,
                  department: true,
                  designation: true,
              },
          },

          asset: {
              include: {
                  assetType: {
                      include: {
                          assetCategory: true,
                      },
                  },
              },
          },
      },
      orderBy: {
        assignedDate: 'desc',
      },
    });
  }

  async findByEmployee(
    employeeId: string,
  ) {
    return this.prisma.employeeAsset.findMany({
      where: {
        employeeId,
      },
      include: {
        asset: true,
      },
      orderBy: {
        assignedDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const assignment =
      await this.prisma.employeeAsset.findUnique({
        where: { id },
        include: {
          employee: {
              include: {
                  company: true,
                  branch: true,
                  department: true,
                  designation: true,
              },
          },

          asset: {
              include: {
                  assetType: {
                      include: {
                          assetCategory: true,
                      },
                  },
              },
          },
      }
      });

    if (!assignment) {
      throw new NotFoundException(
        'Assignment not found',
      );
    }

    return assignment;
  }

  async findByAsset(
    assetId: string,
  ) {
    return this.prisma.employeeAsset.findMany({
      where: {
        assetId,
      },

      include: {
        employee: {
          include: {
            company: true,
            branch: true,
            department: true,
            designation: true,
          },
        },

        asset: {
          include: {
            assetType: {
              include: {
                assetCategory: true,
              },
            },
          },
        },
      },

      orderBy: {
        assignedDate: 'desc',
      },
    });
  }

  async returnAsset(
    id: string,
    dto: ReturnAssetDto,
  ) {
    const assignment =
      await this.findOne(id);

    if (
      assignment.status === 'RETURNED'
    ) {
      throw new BadRequestException(
        'Asset already returned',
      );
    }

    const result =
      await this.prisma.employeeAsset.update({
        where: {
          id,
        },
        data: {
          returnedDate: new Date(dto.returnedDate),
          remarks: dto.remarks,
          status: 'RETURNED',
        },
      });

    await this.prisma.asset.update({
      where: {
        id: assignment.assetId,
      },
      data: {
        status: 'AVAILABLE',
        location: 'IT Store',
      },
    });

    await this.auditService.log(
      'Employee Asset',
      id,
      'RETURN',
      assignment,
      result,
    );

    return result;
  }

}
