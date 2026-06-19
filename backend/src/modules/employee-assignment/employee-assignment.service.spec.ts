import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAssignmentService } from './employee-assignment.service';

describe('EmployeeAssignmentService', () => {
  let service: EmployeeAssignmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAssignmentService],
    }).compile();

    service = module.get<EmployeeAssignmentService>(EmployeeAssignmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
