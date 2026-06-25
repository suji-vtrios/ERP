import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeLeaveBalanceController } from './employee-leave-balance.controller';

describe('EmployeeLeaveBalanceController', () => {
  let controller: EmployeeLeaveBalanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeLeaveBalanceController],
    }).compile();

    controller = module.get<EmployeeLeaveBalanceController>(EmployeeLeaveBalanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
