import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeAssetController } from './employee-asset.controller';
import { EmployeeAssetService } from './employee-asset.service';

describe('EmployeeAssetController', () => {
  let controller: EmployeeAssetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeAssetController],
      providers: [EmployeeAssetService],
    }).compile();

    controller = module.get<EmployeeAssetController>(EmployeeAssetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
