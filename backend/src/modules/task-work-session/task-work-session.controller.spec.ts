import { Test, TestingModule } from '@nestjs/testing';
import { TaskWorkSessionController } from './task-work-session.controller';

describe('TaskWorkSessionController', () => {
  let controller: TaskWorkSessionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskWorkSessionController],
    }).compile();

    controller = module.get<TaskWorkSessionController>(TaskWorkSessionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
