import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingTemplateTaskService } from './onboarding-template-task.service';

describe('OnboardingTemplateTaskService', () => {
  let service: OnboardingTemplateTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingTemplateTaskService],
    }).compile();

    service = module.get<OnboardingTemplateTaskService>(OnboardingTemplateTaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
