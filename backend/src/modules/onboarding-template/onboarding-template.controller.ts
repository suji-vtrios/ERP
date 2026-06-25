import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OnboardingTemplateService } from './onboarding-template.service';
import { CreateOnboardingTemplateDto } from './dto/create-onboarding-template.dto';
import { UpdateOnboardingTemplateDto } from './dto/update-onboarding-template.dto';

@Controller('onboarding-template')
export class OnboardingTemplateController {
  constructor(private readonly onboardingTemplateService: OnboardingTemplateService) {}

  @Post()
  create(@Body() createOnboardingTemplateDto: CreateOnboardingTemplateDto) {
    return this.onboardingTemplateService.create(createOnboardingTemplateDto);
  }

  @Get()
  findAll() {
    return this.onboardingTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.onboardingTemplateService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOnboardingTemplateDto: UpdateOnboardingTemplateDto,
  ) {
    return this.onboardingTemplateService.update(
      id,
      updateOnboardingTemplateDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.onboardingTemplateService.remove(id);
  }
}
