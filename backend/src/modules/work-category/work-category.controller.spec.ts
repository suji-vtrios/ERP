import { Test, TestingModule } from '@nestjs/testing';
import { WorkCategoryController } from './work-category.controller';

describe('WorkCategoryController', () => {
  let controller: WorkCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkCategoryController],
    }).compile();

    controller = module.get<WorkCategoryController>(WorkCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
