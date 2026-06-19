import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalWorkflowStepService } from './approval-workflow-step.service';

describe('ApprovalWorkflowStepService', () => {
  let service: ApprovalWorkflowStepService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApprovalWorkflowStepService],
    }).compile();

    service = module.get<ApprovalWorkflowStepService>(ApprovalWorkflowStepService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
