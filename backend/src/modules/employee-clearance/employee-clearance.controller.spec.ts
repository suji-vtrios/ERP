import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeClearanceController } from './employee-clearance.controller';
import { EmployeeClearanceService } from './employee-clearance.service';

describe('EmployeeClearanceController', () => {
  let controller: EmployeeClearanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeClearanceController],
      providers: [EmployeeClearanceService],
    }).compile();

    controller = module.get<EmployeeClearanceController>(EmployeeClearanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
