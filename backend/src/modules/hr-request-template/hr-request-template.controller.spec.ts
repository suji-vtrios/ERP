import { Test, TestingModule } from '@nestjs/testing';
import { HrRequestTemplateController } from './hr-request-template.controller';
import { HrRequestTemplateService } from './hr-request-template.service';

describe('HrRequestTemplateController', () => {
  let controller: HrRequestTemplateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HrRequestTemplateController],
      providers: [HrRequestTemplateService],
    }).compile();

    controller = module.get<HrRequestTemplateController>(HrRequestTemplateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
