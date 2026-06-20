import { Test, TestingModule } from '@nestjs/testing';
import { TaskReviewsController } from './task-reviews.controller';

describe('TaskReviewsController', () => {
  let controller: TaskReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskReviewsController],
    }).compile();

    controller = module.get<TaskReviewsController>(TaskReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
