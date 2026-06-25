import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResourcesService } from './employee-resources.service';

describe('EmployeeResourcesService', () => {
  let service: EmployeeResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeResourcesService],
    }).compile();

    service = module.get<EmployeeResourcesService>(EmployeeResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
