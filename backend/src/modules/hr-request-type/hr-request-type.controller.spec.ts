import { Test, TestingModule } from '@nestjs/testing';
import { HrRequestTypeController } from './hr-request-type.controller';
import { HrRequestTypeService } from './hr-request-type.service';

describe('HrRequestTypeController', () => {
  let controller: HrRequestTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrRequestTypeController],
      providers: [HrRequestTypeService],
    }).compile();

    controller = module.get<HrRequestTypeController>(HrRequestTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
