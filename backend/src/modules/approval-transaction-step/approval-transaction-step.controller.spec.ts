import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalTransactionStepController } from './approval-transaction-step.controller';
import { ApprovalTransactionStepService } from './approval-transaction-step.service';

describe('ApprovalTransactionStepController', () => {
  let controller: ApprovalTransactionStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalTransactionStepController],
      providers: [ApprovalTransactionStepService],
    }).compile();

    controller = module.get<ApprovalTransactionStepController>(ApprovalTransactionStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
