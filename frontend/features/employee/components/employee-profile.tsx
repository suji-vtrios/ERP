"use client";

import { useEmployee } from "../hooks/use-employee";
import { EmployeeProfileHeader } from "./employee-profile-header";
import { InfoCard } from "@/components/common/info-card";
import { InfoRow } from "@/components/common/info-row";
import { EmployeeTabs } from "./employee-tabs";

interface Props {
  employeeId: string;
}

export function EmployeeProfile({
  employeeId,
}: Props) {
  const {
    data: employee,
    isLoading,
  } = useEmployee(employeeId);

  if (isLoading) {
    return (
      <div className="p-6">
        Loading employee...
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="p-6">
        Employee not found.
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">

        <EmployeeProfileHeader employee={employee} />
        <EmployeeTabs overview={

            <div className="grid gap-6 lg:grid-cols-3">

                <InfoCard title="Personal Information">

                    <InfoRow
                    label="First Name"
                    value={employee.firstName}
                    />

                    <InfoRow
                    label="Last Name"
                    value={employee.lastName}
                    />

                    <InfoRow
                    label="Email"
                    value={employee.email}
                    />

                    <InfoRow
                    label="Mobile"
                    value={employee.mobile}
                    />

                </InfoCard>

                <InfoCard title="Organization">

                    <InfoRow
                    label="Company"
                    value={employee.company?.companyName}
                    />

                    <InfoRow
                    label="Branch"
                    value={employee.branch?.branchName}
                    />

                    <InfoRow
                    label="Department"
                    value={employee.department?.departmentName}
                    />

                    <InfoRow
                    label="Manager"
                    value={
                        employee.manager
                        ? `${employee.manager.firstName} ${employee.manager.lastName}`
                        : "-"
                    }
                    />

                </InfoCard>

                <InfoCard title="Employment">

                    <InfoRow
                    label="Employee Code"
                    value={employee.employeeCode}
                    />

                    <InfoRow
                    label="Designation"
                    value={employee.designation?.designationName}
                    />

                    <InfoRow
                    label="Joining Date"
                    value={employee.joiningDate}
                    />

                    <InfoRow
                    label="Status"
                    value={employee.employmentStatus}
                    />

                </InfoCard>
            

            </div>
            }
        /> 
    </div>   
    );
}