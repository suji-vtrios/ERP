import { Test, TestingModule } from '@nestjs/testing';
import { HrRequestTemplateService } from './hr-request-template.service';

describe('HrRequestTemplateService', () => {
  let service: HrRequestTemplateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrRequestTemplateService],
    }).compile();

    service = module.get<HrRequestTemplateService>(HrRequestTemplateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
