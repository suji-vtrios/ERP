import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTeamMembersController } from './project-team-members.controller';

describe('ProjectTeamMembersController', () => {
  let controller: ProjectTeamMembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTeamMembersController],
    }).compile();

    controller = module.get<ProjectTeamMembersController>(ProjectTeamMembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
