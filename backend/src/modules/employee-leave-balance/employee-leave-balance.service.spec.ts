import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLeaveBalanceService } from './employee-leave-balance.service';

describe('EmployeeLeaveBalanceService', () => {
  let service: EmployeeLeaveBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeLeaveBalanceService],
    }).compile();

    service = module.get<EmployeeLeaveBalanceService>(EmployeeLeaveBalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
