"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import { useCompanies } from "@/features/lookups/hooks/use-companies";

import { useCreateEmployee } from "../hooks/use-create-employee";

import {
  PersonalInformationSection,
} from "./sections/personal-information-section";

import {
  OrganizationSection,
} from "./sections/organization-section";

import { EmploymentSection } from "./sections/employment-section";
import { useUpdateEmployee } from "../hooks/use-update-employee";
import type { Employee } from "../types/employee";


export type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  companyId: string;
  branchId: string;
  departmentId: string;

  designationId: string;
  managerId: string;

  employeeType: string;
  joiningDate: string;
};



interface EmployeeFormProps {
  employee?: Employee | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}
export function EmployeeForm({
  employee,
  onSuccess,
  onCancel,
}: EmployeeFormProps) {
    const form = useForm<EmployeeFormData>({
        defaultValues: {
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",

        companyId: "",
        branchId: "",
        departmentId: "",

        designationId: "",
        managerId: "",

        employeeType: "",
        joiningDate: "",
        },
    });

    const isEdit = !!employee;

    useEffect(() => {
        if (!employee) {
            form.reset();

            return;
        }

        form.reset({
            firstName: employee.firstName ?? "",
            lastName: employee.lastName ?? "",
            email: employee.email ?? "",
            mobile: employee.mobile ?? "",

            companyId: employee.companyId ?? "",
            branchId: employee.branchId ?? "",
            departmentId: employee.departmentId ?? "",

            designationId: employee.designationId ?? "",
            managerId: employee.managerId ?? "",

            employeeType: employee.employeeType ?? "",
            joiningDate: employee.joiningDate
            ? new Date(employee.joiningDate)
                .toISOString()
                .split("T")[0]
            : "",
        });
    }, [employee, form]);

    const {
        data: companies = [],
        isLoading: companiesLoading,
        } = useCompanies();
    

    const createEmployee = useCreateEmployee();
    const updateEmployee = useUpdateEmployee();

    
    const onSubmit = (data: EmployeeFormData) => {
        if (isEdit && employee) {
            updateEmployee.mutate(
            {
                id: employee.id,
                data,
            },
            {
                onSuccess: () => {
                form.reset();
                onSuccess?.();
                },
            }
            );

            return;
        }

        createEmployee.mutate(data, {
            onSuccess: () => {
            form.reset();
            onSuccess?.();
            },
        });
    };
  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8"
    >
    <PersonalInformationSection
        form={form}
    />

    <OrganizationSection
        form={form}
        companies={companies}
        companiesLoading={companiesLoading}
        />

    <EmploymentSection
        form={form}
    />

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
            type="button"
            variant="outline"
            onClick={() => {
                form.reset();
                onCancel?.();
            }}
            >
            Cancel
        </Button>

        <Button
            type="submit"
            disabled={
                createEmployee.isPending ||
                updateEmployee.isPending
            }
            >
            {createEmployee.isPending || updateEmployee.isPending
                ? "Saving..."
                : isEdit
                    ? "Update Employee"
                    : "Save Employee"}
        </Button>
      </div>
    </form>
  );
}