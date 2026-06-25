import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDeductionController } from './employee-deduction.controller';
import { EmployeeDeductionService } from './employee-deduction.service';

describe('EmployeeDeductionController', () => {
  let controller: EmployeeDeductionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDeductionController],
      providers: [EmployeeDeductionService],
    }).compile();

    controller = module.get<EmployeeDeductionController>(EmployeeDeductionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
