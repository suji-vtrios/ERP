import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeClearanceService } from './employee-clearance.service';

describe('EmployeeClearanceService', () => {
  let service: EmployeeClearanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeClearanceService],
    }).compile();

    service = module.get<EmployeeClearanceService>(EmployeeClearanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
