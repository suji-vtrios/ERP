import { Module } from '@nestjs/common';
import { OnboardingTemplateService } from './onboarding-template.service';
import { OnboardingTemplateController } from './onboarding-template.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OnboardingTemplateController],
  providers: [OnboardingTemplateService],
})
export class OnboardingTemplateModule {}
