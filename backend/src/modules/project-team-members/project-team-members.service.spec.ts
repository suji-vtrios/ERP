import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTeamMembersService } from './project-team-members.service';

describe('ProjectTeamMembersService', () => {
  let service: ProjectTeamMembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTeamMembersService],
    }).compile();

    service = module.get<ProjectTeamMembersService>(ProjectTeamMembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
