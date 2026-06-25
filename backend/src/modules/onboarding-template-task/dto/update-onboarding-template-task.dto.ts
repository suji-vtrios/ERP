import { PartialType } from '@nestjs/swagger';

import { CreateOnboardingTemplateTaskDto }
from './create-onboarding-template-task.dto';

export class UpdateOnboardingTemplateTaskDto
  extends PartialType(
    CreateOnboardingTemplateTaskDto,
  ) {}