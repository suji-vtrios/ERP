import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';

import { CreateTaskWorkSessionDto } from './dto/create-task-work-session.dto';
import { EndTaskWorkSessionDto } from './dto/end-task-work-session.dto';
import { WorkLogHeaderService } from '../work-log-header/work-log-header.service';


@Injectable()
    export class TaskWorkSessionService {
    constructor(
        private prisma: PrismaService,
        private workLogHeaderService: WorkLogHeaderService,
    ) {}

    private getWeekRange(
        date: Date,
    ) {
        const start = new Date(date);

        const day =
        start.getDay() === 0
            ? 7
            : start.getDay();

        start.setDate(
        start.getDate() - day + 1,
        );

        start.setHours(0, 0, 0, 0);

        const end = new Date(start);

        end.setDate(
        start.getDate() + 6,
        );

        end.setHours(
        23,
        59,
        59,
        999,
        );

        return {
        start,
        end,
        };
    }

  async startSession(
    dto: CreateTaskWorkSessionDto,
    ) {
    const employee =
        await this.prisma.employee.findUnique({
        where: {
            id: dto.employeeId,
        },
        });

    if (!employee) {
        throw new NotFoundException(
        'Employee not found',
        );
    }

    const workScheduleItem =
        await this.prisma.workScheduleItem.findUnique({
        where: {
            id: dto.workScheduleItemId,
        },
        include: {
            task: true,
        },
        });

    if (!workScheduleItem) {
        throw new NotFoundException(
        'Work schedule item not found',
        );
    }

    const activeSession =
        await this.prisma.taskWorkSession.findFirst({
        where: {
            employeeId: dto.employeeId,
            status: 'ACTIVE',
        },
        });

    if (activeSession) {
        throw new ConflictException(
        'Employee already has an active session',
        );
    }

    return this.prisma.taskWorkSession.create({
        data: {
        workScheduleItemId:
            dto.workScheduleItemId,
        employeeId: dto.employeeId,
        startedAt: new Date(),
        status: 'ACTIVE',
        },
        include: {
        employee: true,
        workScheduleItem: true,
        },
    });
    }

  async endSession(
    id: string,
    dto: EndTaskWorkSessionDto,
    ) {
    const session =
        await this.prisma.taskWorkSession.findUnique({
        where: { id },
        include: {
            workScheduleItem: true,
        },
        });

    if (!session) {
        throw new NotFoundException(
        'Task work session not found',
        );
    }

    if (session.status !== 'ACTIVE') {
        throw new ConflictException(
        'Session is not active',
        );
    }

    const endedAt = new Date();

    const diffMs =
        endedAt.getTime() -
        session.startedAt.getTime();

    const detectedHours = Number(
        (
        diffMs /
        (1000 * 60 * 60)
        ).toFixed(2),
    );

    const completedSession =
        await this.prisma.taskWorkSession.update({
            where: {
            id,
            },
            data: {
            endedAt,
            detectedHours,
            confirmedHours:
                detectedHours,
            adjustmentRemarks:
                dto.adjustmentRemarks,
            status: 'COMPLETED',
            },
            include: {
            employee: true,
            workScheduleItem: true,
            },
        });

    const workDate =
        completedSession.workScheduleItem.workDate;

    const {
        start: startDate,
        end: endDate,
        } = this.getWeekRange(
        workDate,
        );

    let workLogHeader =
        await this.prisma.workLogHeader.findFirst({
            where: {
            employeeId:
                completedSession.employeeId,
            status: 'DRAFT',
            startDate,
            },
        });

        if (!workLogHeader) {
            workLogHeader =
                await this.prisma.workLogHeader.create({
                data: {
                    employeeId:
                    completedSession.employeeId,
                    startDate,
                    endDate,
                    remarks:
                    'Auto generated from task sessions',
                },
                });
            }
        const existingLine =
            await this.prisma.workLogLine.findFirst({
                where: {
                taskWorkSessionId:
                    completedSession.id,
                },
            });

        if (!existingLine) {

            console.log(
                'CREATING WORK LOG LINE',
                );
            await this.prisma.workLogLine.create({
                data: {
                workLogHeaderId:
                    workLogHeader.id,

                workDate,

                taskId:
                    completedSession
                    .workScheduleItem.taskId,

                taskWorkSessionId:
                    completedSession.id,

                workCategoryId:
                    completedSession
                    .workScheduleItem
                    .workCategoryId,

                hours:
                    completedSession.confirmedHours,

                sourceType:
                    'AUTO_SESSION',

                remarks:
                    completedSession
                    .workScheduleItem.title,
                },
            });

            await this.workLogHeaderService
                .recalculateTotalHours(
                workLogHeader.id,
                );
            }
            return completedSession;
        }

        async findByEmployee(
            employeeId: string,
            ) {}

        async findById(id: string) {}

            

}