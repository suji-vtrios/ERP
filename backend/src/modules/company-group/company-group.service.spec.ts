import { Test, TestingModule } from '@nestjs/testing';
import { CompanyGroupService } from './company-group.service';

describe('CompanyGroupService', () => {
  let service: CompanyGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompanyGroupService],
    }).compile();

    service = module.get<CompanyGroupService>(CompanyGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
