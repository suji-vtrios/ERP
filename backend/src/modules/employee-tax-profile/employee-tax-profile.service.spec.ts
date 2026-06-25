import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTaxProfileService } from './employee-tax-profile.service';

describe('EmployeeTaxProfileService', () => {
  let service: EmployeeTaxProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeTaxProfileService],
    }).compile();

    service = module.get<EmployeeTaxProfileService>(EmployeeTaxProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
