import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeSeparationService } from './employee-separation.service';

describe('EmployeeSeparationService', () => {
  let service: EmployeeSeparationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeSeparationService],
    }).compile();

    service = module.get<EmployeeSeparationService>(EmployeeSeparationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
