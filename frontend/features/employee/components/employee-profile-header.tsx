"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import type { Employee } from "../types/employee";
import { ArrowLeft, Building2, MapPin, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface EmployeeProfileHeaderProps {
  employee: Employee;
}

export function EmployeeProfileHeader({
  employee,
}: EmployeeProfileHeaderProps) {
    const initials =
        `${employee.firstName?.[0] ?? ""}${employee.lastName?.[0] ?? ""}`.toUpperCase();
    const router = useRouter();

  return (
    <>
    <Button
        variant="ghost"
        className="mb-4"
        onClick={() => router.push("/hr/employees")}
        >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Employees
    </Button>

    <div className="rounded-xl border bg-card p-8">

        <div className="flex items-start justify-between">

            <div className="flex gap-6">

            <Avatar className="h-20 w-20">
                <AvatarFallback className="text-xl font-semibold">
                {initials}
                </AvatarFallback>
            </Avatar>

            <div className="space-y-3">

                <div>

                <h1 className="text-4xl font-bold">
                    {employee.firstName} {employee.lastName}
                </h1>

                <p className="text-muted-foreground mt-1">
                    {employee.employeeCode}
                </p>

                </div>

                <div className="text-lg text-muted-foreground">
                {employee.designation?.designationName ??
                    "Designation Not Assigned"}
                </div>

                <div className="flex flex-wrap items-center gap-3">

                <Badge>
                    {employee.employmentStatus}
                </Badge>

                {employee.department && (
                    <Badge variant="secondary">
                    <Building2 className="mr-1 h-3 w-3" />

                    {employee.department.departmentName}
                    </Badge>
                )}

                {employee.branch && (
                    <Badge variant="outline">
                    <MapPin className="mr-1 h-3 w-3" />

                    {employee.branch.branchName}
                    </Badge>
                )}

                </div>

            </div>

            </div>

            <Button>
            <Pencil className="mr-2 h-4 w-4" />
            Edit Employee
            </Button>

        </div>

        </div>
        </>
  );
}