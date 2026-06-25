import { Test, TestingModule } from '@nestjs/testing';
import { PayrollDashboardService } from './payroll-dashboard.service';

describe('PayrollDashboardService', () => {
  let service: PayrollDashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PayrollDashboardService],
    }).compile();

    service = module.get<PayrollDashboardService>(PayrollDashboardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
