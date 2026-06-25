import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDeductionService } from './employee-deduction.service';

describe('EmployeeDeductionService', () => {
  let service: EmployeeDeductionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDeductionService],
    }).compile();

    service = module.get<EmployeeDeductionService>(EmployeeDeductionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
