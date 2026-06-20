import { Test, TestingModule } from '@nestjs/testing';
import { TaskWorkSessionService } from './task-work-session.service';

describe('TaskWorkSessionService', () => {
  let service: TaskWorkSessionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskWorkSessionService],
    }).compile();

    service = module.get<TaskWorkSessionService>(TaskWorkSessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
