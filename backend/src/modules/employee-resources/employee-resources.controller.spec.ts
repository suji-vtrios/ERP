import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeResourcesController } from './employee-resources.controller';
import { EmployeeResourcesService } from './employee-resources.service';

describe('EmployeeResourcesController', () => {
  let controller: EmployeeResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeResourcesController],
      providers: [EmployeeResourcesService],
    }).compile();

    controller = module.get<EmployeeResourcesController>(EmployeeResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
