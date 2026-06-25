import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSeparationController } from './employee-separation.controller';

describe('EmployeeSeparationController', () => {
  let controller: EmployeeSeparationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeSeparationController],
    }).compile();

    controller = module.get<EmployeeSeparationController>(EmployeeSeparationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
