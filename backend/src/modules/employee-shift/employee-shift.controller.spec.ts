import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeShiftController } from './employee-shift.controller';

describe('EmployeeShiftController', () => {
  let controller: EmployeeShiftController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeShiftController],
    }).compile();

    controller = module.get<EmployeeShiftController>(EmployeeShiftController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
