import { Test, TestingModule } from '@nestjs/testing';
import { TaskParticipantsController } from './task-participants.controller';

describe('TaskParticipantsController', () => {
  let controller: TaskParticipantsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskParticipantsController],
    }).compile();

    controller = module.get<TaskParticipantsController>(TaskParticipantsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
