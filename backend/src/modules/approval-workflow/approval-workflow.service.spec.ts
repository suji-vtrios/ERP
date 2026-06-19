import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalWorkflowService } from './approval-workflow.service';

describe('ApprovalWorkflowService', () => {
  let service: ApprovalWorkflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalWorkflowService],
    }).compile();

    service = module.get<ApprovalWorkflowService>(ApprovalWorkflowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
