import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTasksController } from './project-tasks.controller';

describe('ProjectTasksController', () => {
  let controller: ProjectTasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTasksController],
    }).compile();

    controller = module.get<ProjectTasksController>(ProjectTasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
