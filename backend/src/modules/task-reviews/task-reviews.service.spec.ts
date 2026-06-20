import { Test, TestingModule } from '@nestjs/testing';
import { TaskReviewsService } from './task-reviews.service';

describe('TaskReviewsService', () => {
  let service: TaskReviewsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskReviewsService],
    }).compile();

    service = module.get<TaskReviewsService>(TaskReviewsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
