import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAssignmentController } from './employee-assignment.controller';

describe('EmployeeAssignmentController', () => {
  let controller: EmployeeAssignmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAssignmentController],
    }).compile();

    controller = module.get<EmployeeAssignmentController>(EmployeeAssignmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
