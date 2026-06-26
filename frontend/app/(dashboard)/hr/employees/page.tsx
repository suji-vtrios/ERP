import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";

import { EmployeeWorkspace } from "@/features/employee/components/employee-workspace";

export default function EmployeesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Employees"
        description="Manage company employees"
      />

      <EmployeeWorkspace />
    </PageContainer>
  );
}