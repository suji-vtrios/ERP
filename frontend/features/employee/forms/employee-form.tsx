"use client";

import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useCompanies } from "@/features/lookups/hooks/use-companies";
import { useBranches } from "@/features/lookups/hooks/use-branches";
import { useDepartments } from "@/features/lookups/hooks/use-departments";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LookupSelect } from "@/components/forms/lookup-select";
import { useCreateEmployee } from "../hooks/use-create-employee";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

type EmployeeFormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;

  companyId: string;
  branchId: string;
  departmentId: string;

  designationId: string;
  ManagerId: string;

  employeeTypeId: string;
  joiningDate: string;
};

interface EmployeeFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EmployeeForm({
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
        ManagerId: "",

        employeeTypeId: "",
        joiningDate: "",
        },
    });

    const companyId = form.watch("companyId");
    const branchId = form.watch("branchId");

    const {
        data: companies = [],
        isLoading: companiesLoading,
        } = useCompanies();

        const {
        data: branches = [],
        isLoading: branchesLoading,
        } = useBranches(companyId);

        const {
        data: departments = [],
        isLoading: departmentsLoading,
    } = useDepartments(branchId);

    const createEmployee = useCreateEmployee();

  const onSubmit = (data: EmployeeFormData) => {
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
      <FormSection title="Personal Information">
        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">
            <RequiredLabel required>
              First Name
            </RequiredLabel>

            <Input
              placeholder="Enter First Name"
              {...form.register("firstName")}
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel>
              Last Name
            </RequiredLabel>

            <Input
              placeholder="Enter Last Name"
              {...form.register("lastName")}
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel>
              Email
            </RequiredLabel>

            <Input
              type="email"
              placeholder="Enter Email"
              {...form.register("email")}
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel>
              Mobile
            </RequiredLabel>

            <Input
              placeholder="Enter Mobile Number"
              {...form.register("mobile")}
            />
          </div>

        </div>
      </FormSection>

      <FormSection title="Organization">
            <div className="grid gap-4 md:grid-cols-2">

                <div className="space-y-2">
                    <RequiredLabel required>
                        Company
                    </RequiredLabel>

                    <Controller
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                        <LookupSelect
                            value={field.value}
                            onChange={(value) => {
                                field.onChange(value);

                                form.setValue("branchId", "");
                                form.setValue("departmentId", "");
                            }}
                            items={companies}
                            placeholder="Select Company"
                            loading={companiesLoading}
                        />
                    )}
                />
                </div>
            </div>

            <div className="space-y-2">
                <RequiredLabel required>
                    Branch
                </RequiredLabel>

                <Controller
                    control={form.control}
                    name="branchId"
                    render={({ field }) => (
                    <LookupSelect
                        value={field.value}
                        onChange={(value) => {
                        field.onChange(value);

                        form.setValue("departmentId", "");
                        }}
                        items={branches}
                        placeholder={
                        companyId
                            ? "Select Branch"
                            : "Select Company First"
                        }
                        loading={branchesLoading}
                        disabled={!companyId}
                    />
                    )}
                />
            </div>

            <div className="space-y-2">
                <RequiredLabel required>
                    Department
                </RequiredLabel>

                <Controller
                    control={form.control}
                    name="departmentId"
                    render={({ field }) => (
                    <LookupSelect
                        value={field.value}
                        onChange={field.onChange}
                        items={departments}
                        placeholder={
                        branchId
                            ? "Select Department"
                            : "Select Branch First"
                        }
                        loading={departmentsLoading}
                        disabled={!branchId}
                    />
                    )}
                />
            </div>

        </FormSection>

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
            disabled={createEmployee.isPending}
            >
            {createEmployee.isPending
                ? "Saving..."
                : "Save Employee"}
        </Button>
      </div>
    </form>
  );
}