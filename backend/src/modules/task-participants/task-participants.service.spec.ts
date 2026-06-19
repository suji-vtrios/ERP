import { Test, TestingModule } from '@nestjs/testing';
import { TaskParticipantsService } from './task-participants.service';

describe('TaskParticipantsService', () => {
  let service: TaskParticipantsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskParticipantsService],
    }).compile();

    service = module.get<TaskParticipantsService>(TaskParticipantsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
