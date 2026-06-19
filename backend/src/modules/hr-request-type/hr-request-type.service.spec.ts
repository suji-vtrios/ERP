import { Test, TestingModule } from '@nestjs/testing';
import { HrRequestTypeService } from './hr-request-type.service';

describe('HrRequestTypeService', () => {
  let service: HrRequestTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HrRequestTypeService],
    }).compile();

    service = module.get<HrRequestTypeService>(HrRequestTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
