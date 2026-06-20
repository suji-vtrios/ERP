import { Test, TestingModule } from '@nestjs/testing';
import { WorkLogLineService } from './work-log-line.service';

describe('WorkLogLineService', () => {
  let service: WorkLogLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkLogLineService],
    }).compile();

    service = module.get<WorkLogLineService>(WorkLogLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
