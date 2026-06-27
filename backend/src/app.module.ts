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
import { TaskReviewsModule } from './modules/task-reviews/task-reviews.module';
import { CompanySettingsModule } from './modules/company-settings/company-settings.module';
import { WorkLogHeaderModule } from './modules/work-log-header/work-log-header.module';
import { WorkLogLineModule } from './modules/work-log-line/work-log-line.module';
import { WorkCategoryModule } from './modules/work-category/work-category.module';
import { TaskWorkSessionModule } from './modules/task-work-session/task-work-session.module';
import { WorkScheduleModule } from './modules/work-schedule/work-schedule.module';
import { WorkScheduleItemModule } from './modules/work-schedule-item/work-schedule-item.module';
import { ApprovalModule } from './modules/approval/approval.module';
import { HolidayModule } from './modules/holiday/holiday.module';
import { LeaveTypeModule } from './modules/leave-type/leave-type.module';
import { LeavePolicyModule } from './modules/leave-policy/leave-policy.module';
import { EmployeeLeaveBalanceModule } from './modules/employee-leave-balance/employee-leave-balance.module';
import { LeaveRequestModule } from './modules/leave-request/leave-request.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { EmployeeSeparationModule } from './modules/employee-separation/employee-separation.module';
import { ShiftModule } from './modules/shift/shift.module';
import { EmployeeShiftModule } from './modules/employee-shift/employee-shift.module';
import { AssetTypeModule } from './modules/asset-type/asset-type.module';
import { AssetModule } from './modules/asset/asset.module';
import { EmployeeAssetModule } from './modules/employee-asset/employee-asset.module';
import { EmployeeDocumentTypeModule } from './modules/employee-document-type/employee-document-type.module';
import { EmployeeDocumentModule } from './modules/employee-document/employee-document.module';
import { EmployeeClearanceModule } from './modules/employee-clearance/employee-clearance.module';
import { ResourceTypesModule } from './modules/resource-types/resource-types.module';
import { ResourcesModule } from './modules/resources/resources.module';
import { EmployeeResourcesModule } from './modules/employee-resources/employee-resources.module';
import { OnboardingTemplateModule } from './modules/onboarding-template/onboarding-template.module';
import { OnboardingTemplateTaskModule } from './modules/onboarding-template-task/onboarding-template-task.module';
import { EmployeeOnboardingModule } from './modules/employee-onboarding/employee-onboarding.module';
import { EmployeeOnboardingTaskModule } from './modules/employee-onboarding-task/employee-onboarding-task.module';
import { SalaryComponentModule } from './modules/salary-component/salary-component.module';
import { EmployeeSalaryModule } from './modules/employee-salary/employee-salary.module';
import { EmployeeTaxProfileModule } from './modules/employee-tax-profile/employee-tax-profile.module';
import { EmployeeDeductionModule } from './modules/employee-deduction/employee-deduction.module';
import { PayrollRunModule } from './modules/payroll-run/payroll-run.module';
import { PayrollDashboardModule } from './modules/payroll-dashboard/payroll-dashboard.module';
import { AssetCategoryModule } from './modules/asset-category/asset-category.module';


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
    TaskReviewsModule,
    CompanySettingsModule,
    WorkLogHeaderModule,
    WorkLogLineModule,
    WorkCategoryModule,
    TaskWorkSessionModule,
    WorkScheduleModule,
    WorkScheduleItemModule,
    ApprovalModule,
    HolidayModule,
    LeaveTypeModule,
    LeavePolicyModule,
    EmployeeLeaveBalanceModule,
    LeaveRequestModule,
    AttendanceModule,
    EmployeeSeparationModule,
    ShiftModule,
    EmployeeShiftModule,
    AssetTypeModule,
    AssetModule,
    EmployeeAssetModule,
    EmployeeDocumentTypeModule,
    EmployeeDocumentModule,
    EmployeeClearanceModule,
    ResourceTypesModule,
    ResourcesModule,
    EmployeeResourcesModule,
    OnboardingTemplateModule,
    OnboardingTemplateTaskModule,
    EmployeeOnboardingModule,
    EmployeeOnboardingTaskModule,
    SalaryComponentModule,
    EmployeeSalaryModule,
    EmployeeTaxProfileModule,
    EmployeeDeductionModule,
    PayrollRunModule,
    PayrollDashboardModule,
    AssetCategoryModule,
  ],
})
export class AppModule {}