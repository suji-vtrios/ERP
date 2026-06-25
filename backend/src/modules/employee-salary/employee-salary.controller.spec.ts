import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSalaryController } from './employee-salary.controller';
import { EmployeeSalaryService } from './employee-salary.service';

describe('EmployeeSalaryController', () => {
  let controller: EmployeeSalaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSalaryController],
      providers: [EmployeeSalaryService],
    }).compile();

    controller = module.get<EmployeeSalaryController>(EmployeeSalaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
