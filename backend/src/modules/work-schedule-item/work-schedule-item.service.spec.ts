import { Test, TestingModule } from '@nestjs/testing';
import { WorkScheduleItemService } from './work-schedule-item.service';

describe('WorkScheduleItemService', () => {
  let service: WorkScheduleItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkScheduleItemService],
    }).compile();

    service = module.get<WorkScheduleItemService>(WorkScheduleItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
