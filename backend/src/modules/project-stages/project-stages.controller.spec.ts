import { Test, TestingModule } from '@nestjs/testing';
import { ProjectStagesController } from './project-stages.controller';

describe('ProjectStagesController', () => {
  let controller: ProjectStagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectStagesController],
    }).compile();

    controller = module.get<ProjectStagesController>(ProjectStagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
