import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeTaxProfileController } from './employee-tax-profile.controller';
import { EmployeeTaxProfileService } from './employee-tax-profile.service';

describe('EmployeeTaxProfileController', () => {
  let controller: EmployeeTaxProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeTaxProfileController],
      providers: [EmployeeTaxProfileService],
    }).compile();

    controller = module.get<EmployeeTaxProfileController>(EmployeeTaxProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
