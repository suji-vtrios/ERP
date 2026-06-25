import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAssetService } from './employee-asset.service';

describe('EmployeeAssetService', () => {
  let service: EmployeeAssetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeAssetService],
    }).compile();

    service = module.get<EmployeeAssetService>(EmployeeAssetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
