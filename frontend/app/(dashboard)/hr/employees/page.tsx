import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";

import { EmployeeForm } from "@/features/employee/forms/employee-form";

export default function EmployeesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Employees"
        description="Manage company employees"
      />

      <div className="mt-6 max-w-5xl rounded-lg border p-6">
        <EmployeeForm />
      </div>
    </PageContainer>
  );
}