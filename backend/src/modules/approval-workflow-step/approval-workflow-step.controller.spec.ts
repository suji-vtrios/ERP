import { Test, TestingModule } from '@nestjs/testing';
import { ApprovalWorkflowStepController } from './approval-workflow-step.controller';
import { ApprovalWorkflowStepService } from './approval-workflow-step.service';

describe('ApprovalWorkflowStepController', () => {
  let controller: ApprovalWorkflowStepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApprovalWorkflowStepController],
      providers: [ApprovalWorkflowStepService],
    }).compile();

    controller = module.get<ApprovalWorkflowStepController>(ApprovalWorkflowStepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
