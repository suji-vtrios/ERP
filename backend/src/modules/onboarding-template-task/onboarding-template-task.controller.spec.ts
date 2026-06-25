import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingTemplateTaskController } from './onboarding-template-task.controller';
import { OnboardingTemplateTaskService } from './onboarding-template-task.service';

describe('OnboardingTemplateTaskController', () => {
  let controller: OnboardingTemplateTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingTemplateTaskController],
      providers: [OnboardingTemplateTaskService],
    }).compile();

    controller = module.get<OnboardingTemplateTaskController>(OnboardingTemplateTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
