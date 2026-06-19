import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalTransactionService } from './approval-transaction.service';

describe('ApprovalTransactionService', () => {
  let service: ApprovalTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalTransactionService],
    }).compile();

    service = module.get<ApprovalTransactionService>(ApprovalTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
