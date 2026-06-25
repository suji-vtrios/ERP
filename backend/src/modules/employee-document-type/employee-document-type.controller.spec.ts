import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeDocumentTypeController } from './employee-document-type.controller';
import { EmployeeDocumentTypeService } from './employee-document-type.service';

describe('EmployeeDocumentTypeController', () => {
  let controller: EmployeeDocumentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeDocumentTypeController],
      providers: [EmployeeDocumentTypeService],
    }).compile();

    controller = module.get<EmployeeDocumentTypeController>(EmployeeDocumentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
