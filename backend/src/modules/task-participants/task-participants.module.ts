import { Module } from '@nestjs/common';
import { TaskParticipantsController } from './task-participants.controller';
import { TaskParticipantsService } from './task-participants.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [TaskParticipantsController],
  providers: [
    TaskParticipantsService,
    PrismaService,
  ],
})
export class TaskParticipantsModule {}