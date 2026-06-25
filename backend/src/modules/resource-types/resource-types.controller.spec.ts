import { Test, TestingModule } from '@nestjs/testing';
import { ResourceTypesController } from './resource-types.controller';
import { ResourceTypesService } from './resource-types.service';

describe('ResourceTypesController', () => {
  let controller: ResourceTypesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceTypesController],
      providers: [ResourceTypesService],
    }).compile();

    controller = module.get<ResourceTypesController>(ResourceTypesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
