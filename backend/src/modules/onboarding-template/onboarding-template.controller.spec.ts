import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingTemplateController } from './onboarding-template.controller';
import { OnboardingTemplateService } from './onboarding-template.service';

describe('OnboardingTemplateController', () => {
  let controller: OnboardingTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OnboardingTemplateController],
      providers: [OnboardingTemplateService],
    }).compile();

    controller = module.get<OnboardingTemplateController>(OnboardingTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
