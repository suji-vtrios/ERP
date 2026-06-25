import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDocumentTypeService } from './employee-document-type.service';

describe('EmployeeDocumentTypeService', () => {
  let service: EmployeeDocumentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeDocumentTypeService],
    }).compile();

    service = module.get<EmployeeDocumentTypeService>(EmployeeDocumentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
