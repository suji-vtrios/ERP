import { Test, TestingModule } from '@nestjs/testing';
import { ResourceTypesService } from './resource-types.service';

describe('ResourceTypesService', () => {
  let service: ResourceTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceTypesService],
    }).compile();

    service = module.get<ResourceTypesService>(ResourceTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
