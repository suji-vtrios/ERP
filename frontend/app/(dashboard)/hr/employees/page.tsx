import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";

import { EmployeeTable } from "@/features/employee/components/employee-table";
import { EmployeeToolbar } from "@/features/employee/components/employee-toolbar";

export default function EmployeesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Employees"
        description="Manage company employees"
      />

      <EmployeeToolbar />
      <EmployeeTable />
    </PageContainer>
  );
}