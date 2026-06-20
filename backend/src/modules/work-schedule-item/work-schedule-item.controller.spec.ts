import { Test, TestingModule } from '@nestjs/testing';
import { WorkScheduleItemController } from './work-schedule-item.controller';

describe('WorkScheduleItemController', () => {
  let controller: WorkScheduleItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkScheduleItemController],
    }).compile();

    controller = module.get<WorkScheduleItemController>(WorkScheduleItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
