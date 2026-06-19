import { Test, TestingModule } from '@nestjs/testing';
import { CompanyGroupController } from './company-group.controller';

describe('CompanyGroupController', () => {
  let controller: CompanyGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompanyGroupController],
    }).compile();

    controller = module.get<CompanyGroupController>(CompanyGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
