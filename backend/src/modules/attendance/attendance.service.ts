import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { Prisma } from '@prisma/client';

import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { AttendanceFilterDto } from './dto/attendance-filter.dto';
import { CheckInDto } from './dto/check-in.dto';
import { CheckOutDto } from './dto/check-out.dto';

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(
    dto: CreateAttendanceDto,
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

    const attendanceDate =
      new Date(dto.attendanceDate);

    const existing =
      await this.prisma.attendance.findFirst({
        where: {
          employeeId: dto.employeeId,
          attendanceDate,
        },
      });

    if (existing) {
      throw new BadRequestException(
        'Attendance already exists',
      );
    }

    return this.prisma.attendance.create({
      data: {
        employeeId: dto.employeeId,
        attendanceDate,
        remarks: dto.remarks,
        status: 'PRESENT',
      },
    });
  }

  async findAll(
    filters: AttendanceFilterDto,
  ) {
    const where: Prisma.AttendanceWhereInput =
      {};

    if (filters.employeeId) {
      where.employeeId =
        filters.employeeId;
    }

    if (filters.status) {
      where.status =
        filters.status.toUpperCase();
    }

    return this.prisma.attendance.findMany({
      where,
      include: {
        employee: true,
      },
      orderBy: {
        attendanceDate: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const attendance =
      await this.prisma.attendance.findUnique({
        where: { id },
        include: {
          employee: true,
        },
      });

    if (!attendance) {
      throw new NotFoundException(
        'Attendance not found',
      );
    }

    return attendance;
  }

  async checkIn(dto: CheckInDto) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

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
    const employeeShift =
      await this.prisma.employeeShift.findFirst({
        where: {
          employeeId: dto.employeeId,
          isActive: true,
        },
        include: {
          shift: true,
        },
        orderBy: {
          effectiveFrom: 'desc',
        },
      });
    
    let shiftId: string | null = null;

      if (employeeShift) {
        shiftId = employeeShift.shiftId;
      }
    let lateMinutes = 0;

      if (employeeShift?.shift) {
        const now = new Date();

        const [hours, minutes] =
          employeeShift.shift.startTime
            .split(':')
            .map(Number);

        const shiftStart = new Date();
        shiftStart.setHours(
          hours,
          minutes +
            employeeShift.shift.graceMinutes,
          0,
          0,
        );

        if (now > shiftStart) {
          lateMinutes = Math.floor(
            (now.getTime() -
              shiftStart.getTime()) /
              (1000 * 60),
          );
        }
      }

    let attendance =
        await this.prisma.attendance.findFirst({
        where: {
          employeeId: dto.employeeId,
          attendanceDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        });

    if (!attendance) {
        attendance =
        await this.prisma.attendance.create({
            data: {
              employeeId: dto.employeeId,
              attendanceDate: startOfDay,
              status: 'PRESENT',
              checkInTime: new Date(),
              shiftId,
              lateMinutes,
            }
        });

        return attendance;
    }

    if (attendance.checkInTime) {
        throw new BadRequestException(
        'Already checked in today',
        );
    }

    return this.prisma.attendance.update({
        where: {
          id: attendance.id,
        },
        data: {
          checkInTime: new Date(),
          shiftId,
          lateMinutes,
        },
      });
    }

  async checkOut(dto: CheckOutDto) {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const attendance =
        await this.prisma.attendance.findFirst({
        where: {
          employeeId: dto.employeeId,
          attendanceDate: {
            gte: startOfDay,
            lte: endOfDay,
          },
        },
        });

    if (!attendance) {
        throw new BadRequestException(
        'No attendance found for today',
        );
    }

    if (!attendance.checkInTime) {
        throw new BadRequestException(
        'Employee has not checked in',
        );
    }

    if (attendance.checkOutTime) {
        throw new BadRequestException(
        'Already checked out',
        );
    }

    const checkOutTime = new Date();
    const shift =
      attendance.shiftId
        ? await this.prisma.shift.findUnique({
            where: {
              id: attendance.shiftId,
            },
          })
        : null;

    let earlyDepartureMinutes = 0;

      if (shift) {
        const [hours, minutes] =
          shift.endTime.split(':').map(Number);

        const shiftEnd = new Date();

        shiftEnd.setHours(
          hours,
          minutes,
          0,
          0,
        );

        if (checkOutTime < shiftEnd) {
          earlyDepartureMinutes = Math.floor(
            (shiftEnd.getTime() -
              checkOutTime.getTime()) /
              (1000 * 60),
          );
        }
      }

    const workingHours =
        (
        checkOutTime.getTime() -
        attendance.checkInTime.getTime()
        ) /
        (1000 * 60 * 60);

    let status = 'PRESENT';

      if (workingHours < 4) {
        status = 'HALF_DAY';
      }

    return this.prisma.attendance.update({
        where: {
        id: attendance.id,
        },
        data: {
          checkOutTime,
          workedHours: Number(
            workingHours.toFixed(2),
          ),
          earlyDepartureMinutes,
          status,
        },
    });
    }
}