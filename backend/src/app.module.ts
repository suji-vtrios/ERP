import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { CompanyModule } from './modules/company/company.module';
import { ConfigModule } from '@nestjs/config';
import { AuditModule } from './modules/audit/audit.module';
import { CompanyGroupModule } from './modules/company-group/company-group.module';
import { BranchModule } from './modules/branch/branch.module';
import { DepartmentModule } from './modules/department/department.module';
import { EmployeeModule } from './modules/employee/employee.module';
import { EmployeeAssignmentModule } from './modules/employee-assignment/employee-assignment.module';
import { DesignationModule } from './modules/designation/designation.module';
import { HrRequestTypeModule } from './modules/hr-request-type/hr-request-type.module';
import { HrRequestTemplateModule } from './modules/hr-request-template/hr-request-template.module';
import { HrRequestModule } from './modules/hr-request/hr-request.module';
import { ApprovalWorkflowModule } from './modules/approval-workflow/approval-workflow.module';
import { ApprovalTransactionModule } from './modules/approval-transaction/approval-transaction.module';
import { ApprovalWorkflowStepModule } from './modules/approval-workflow-step/approval-workflow-step.module';
import { ApprovalTransactionStepModule } from './modules/approval-transaction-step/approval-transaction-step.module';
import { DocumentTemplateModule } from './modules/document-template/document-template.module';
import { DocumentGeneratorModule } from './modules/document-generator/document-generator.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ProjectTeamMembersModule } from './modules/project-team-members/project-team-members.module';
import { ProjectStagesModule } from './modules/project-stages/project-stages.module';
import { ProjectTasksModule } from './modules/project-tasks/project-tasks.module';
import { TaskParticipantsModule } from './modules/task-participants/task-participants.module';
import { TaskSubmissionsModule } from './modules/task-submissions/task-submissions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CompanyModule,
    AuditModule,
    CompanyGroupModule,
    BranchModule,
    DepartmentModule,
    EmployeeModule,
    EmployeeAssignmentModule,
    DesignationModule,
    HrRequestTypeModule,
    HrRequestTemplateModule,
    HrRequestModule,
    ApprovalWorkflowModule,
    ApprovalTransactionModule,
    ApprovalWorkflowStepModule,
    ApprovalTransactionStepModule,
    DocumentTemplateModule,
    DocumentGeneratorModule,
    ProjectsModule,
    ProjectTeamMembersModule,
    ProjectStagesModule,
    ProjectTasksModule,
    TaskParticipantsModule,
    TaskSubmissionsModule,
  ],
})
export class AppModule {}