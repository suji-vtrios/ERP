import { Test, TestingModule } from '@nestjs/testing';
import { WorkLogLineController } from './work-log-line.controller';

describe('WorkLogLineController', () => {
  let controller: WorkLogLineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkLogLineController],
    }).compile();

    controller = module.get<WorkLogLineController>(WorkLogLineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
