import { Test, TestingModule } from '@nestjs/testing';
import { WorkCategoryService } from './work-category.service';

describe('WorkCategoryService', () => {
  let service: WorkCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkCategoryService],
    }).compile();

    service = module.get<WorkCategoryService>(WorkCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
