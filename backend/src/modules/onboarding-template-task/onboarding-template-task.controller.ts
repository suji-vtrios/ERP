import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OnboardingTemplateTaskService } from './onboarding-template-task.service';
import { CreateOnboardingTemplateTaskDto } from './dto/create-onboarding-template-task.dto';
import { UpdateOnboardingTemplateTaskDto } from './dto/update-onboarding-template-task.dto';

@Controller('onboarding-template-task')
export class OnboardingTemplateTaskController {
  constructor(private readonly onboardingTemplateTaskService: OnboardingTemplateTaskService) {}

  @Post()
  create(@Body() createOnboardingTemplateTaskDto: CreateOnboardingTemplateTaskDto) {
    return this.onboardingTemplateTaskService.create(createOnboardingTemplateTaskDto);
  }

  @Get()
  findAll() {
    return this.onboardingTemplateTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingTemplateTaskService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOnboardingTemplateTaskDto: UpdateOnboardingTemplateTaskDto) {
    return this.onboardingTemplateTaskService.update(id, updateOnboardingTemplateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingTemplateTaskService.remove(id);
  }
}
