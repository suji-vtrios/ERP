import { Test, TestingModule } from '@nestjs/testing';
import { PayrollDashboardController } from './payroll-dashboard.controller';

describe('PayrollDashboardController', () => {
  let controller: PayrollDashboardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayrollDashboardController],
    }).compile();

    controller = module.get<PayrollDashboardController>(PayrollDashboardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
