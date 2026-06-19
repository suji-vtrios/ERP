import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalTransactionStepService } from './approval-transaction-step.service';

describe('ApprovalTransactionStepService', () => {
  let service: ApprovalTransactionStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalTransactionStepService],
    }).compile();

    service = module.get<ApprovalTransactionStepService>(ApprovalTransactionStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
