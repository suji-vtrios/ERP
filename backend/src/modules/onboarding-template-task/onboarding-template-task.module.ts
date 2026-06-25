import { Module } from '@nestjs/common';
import { OnboardingTemplateTaskService } from './onboarding-template-task.service';
import { OnboardingTemplateTaskController } from './onboarding-template-task.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OnboardingTemplateTaskController],
  providers: [OnboardingTemplateTaskService],
})
export class OnboardingTemplateTaskModule {}
