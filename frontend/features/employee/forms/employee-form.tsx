"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createEmployeeSchema,
  type CreateEmployeeForm,
} from "../schemas/create-employee.schema";
import {
  useCompanies,
  useBranches,
  useDepartments,
} from "@/features/lookups/hooks/use-lookups";
import { Controller } from "react-hook-form";

import { LookupSelect } from "@/features/lookups/components/lookup-select";

export function EmployeeForm() {
    const form = useForm<CreateEmployeeForm>({
            resolver: zodResolver(createEmployeeSchema),

            defaultValues: {
            employeeCode: "",
            firstName: "",
            lastName: "",
            email: "",
            mobile: "",
            companyId: "",
            branchId: "",
            departmentId: "",
            designationId: "",
            managerId: "",
            joiningDate: "",
            employeeType: "",
            },
        });
    const {
        data: companies = [],
        isLoading: companiesLoading,
    } = useCompanies();

    const companyId = form.watch("companyId");

    console.log("Watch companyId:", companyId);

    const {
        data: branches = [],
        isLoading: branchesLoading,
    } = useBranches(companyId);

    const branchId = form.watch("branchId");

    const {
        data: departments = [],
        isLoading: departmentsLoading,
    } = useDepartments(branchId);

    const onSubmit = (data: CreateEmployeeForm) => {
  
    };


           
  return (
    <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
    >
      {/* Personal Information */}
      <FormSection title="Personal Information">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <RequiredLabel required>  Employee Code</RequiredLabel>
            <Input
                placeholder="Enter Employee Code"
                {...form.register("employeeCode")}
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel required>First Name</RequiredLabel>
            <Input
                placeholder="Enter First Name"
                {...form.register("firstName")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Last Name</label>
            <Input
                placeholder="Enter Last Name"
                {...form.register("lastName")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
                type="email"
                placeholder="Enter Email Address"
                {...form.register("email")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile</label>
            <Input
                type="tel"
                placeholder="Enter Mobile Number"
                {...form.register("mobile")}
            />
          </div>
        </div>
      </FormSection>

      {/* Organization */}
      <FormSection title="Organization">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <RequiredLabel required>Company</RequiredLabel>
                <Controller
                    control={form.control}
                    name="companyId"
                    render={({ field }) => (
                        <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Company" />
                        </SelectTrigger>

                        <SelectContent>
                            {companies.map((company) => (
                            <SelectItem
                                key={company.id}
                                value={company.id}
                            >
                                {company.code} - {company.name}
                            </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                    )}
                />

          </div>

          <div className="space-y-2">
            <RequiredLabel required>Branch</RequiredLabel>
            <Controller
                control={form.control}
                name="branchId"
                render={({ field }) => (
                    <LookupSelect
                    placeholder="Select Branch"
                    items={branches}
                    loading={branchesLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                    />
                )}
            />
          </div>

          <div className="space-y-2">
            <RequiredLabel required>Department</RequiredLabel>
            <Controller
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                    <LookupSelect
                    placeholder="Select Department"
                    items={departments}
                    loading={departmentsLoading}
                    value={field.value}
                    onValueChange={field.onChange}
                    />
                )}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Designation
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">
              Reporting Manager
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Reporting Manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">
                  Loading...
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      {/* Employment */}
      <FormSection title="Employment">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Joining Date
            </label>
            <Input
                type="date"
                {...form.register("joiningDate")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Employee Type
            </label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Employee Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PERMANENT">
                  Permanent
                </SelectItem>
                <SelectItem value="CONTRACT">
                  Contract
                </SelectItem>
                <SelectItem value="INTERN">
                  Intern
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </FormSection>

      {/* Footer */}
      <div className="flex justify-end gap-3 border-t pt-6 mt-8">
        <Button variant="outline">
          Cancel
        </Button>

        <Button type="submit">
            Create Employee
        </Button>
      </div>
    </form>
  );
}