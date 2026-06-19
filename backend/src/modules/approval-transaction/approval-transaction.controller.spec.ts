import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalTransactionController } from './approval-transaction.controller';

describe('ApprovalTransactionController', () => {
  let controller: ApprovalTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalTransactionController],
    }).compile();

    controller = module.get<ApprovalTransactionController>(ApprovalTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
