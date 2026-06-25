import { Test, TestingModule } from '@nestjs/testing';
import { OnboardingTemplateService } from './onboarding-template.service';

describe('OnboardingTemplateService', () => {
  let service: OnboardingTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnboardingTemplateService],
    }).compile();

    service = module.get<OnboardingTemplateService>(OnboardingTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
