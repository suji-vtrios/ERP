import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeOnboardingTaskController } from './employee-onboarding-task.controller';
import { EmployeeOnboardingTaskService } from './employee-onboarding-task.service';

describe('EmployeeOnboardingTaskController', () => {
  let controller: EmployeeOnboardingTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeOnboardingTaskController],
      providers: [EmployeeOnboardingTaskService],
    }).compile();

    controller = module.get<EmployeeOnboardingTaskController>(EmployeeOnboardingTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
