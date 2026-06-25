import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeOnboardingTaskService } from './employee-onboarding-task.service';

describe('EmployeeOnboardingTaskService', () => {
  let service: EmployeeOnboardingTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeOnboardingTaskService],
    }).compile();

    service = module.get<EmployeeOnboardingTaskService>(EmployeeOnboardingTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
