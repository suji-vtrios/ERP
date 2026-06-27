"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import { LookupSelect } from "@/components/forms/lookup-select";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

import { useBranches } from "@/features/lookups/hooks/use-branches";
import { useDepartments } from "@/features/lookups/hooks/use-departments";

import type { LookupItem } from "@/features/lookups/types/lookup";
import type { EmployeeFormData } from "../employee-form";

interface OrganizationSectionProps {
  form: UseFormReturn<EmployeeFormData>;
  companies: LookupItem[];
  companiesLoading: boolean;
}

export function OrganizationSection({
  form,
  companies,
  companiesLoading,
}: OrganizationSectionProps) {
  const companyId = form.watch("companyId");
  const branchId = form.watch("branchId");

  const {
    data: branches = [],
    isLoading: branchesLoading,
  } = useBranches(companyId);

  const {
    data: departments = [],
    isLoading: departmentsLoading,
  } = useDepartments(branchId);

  return (
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

      </div>
    </FormSection>
  );
}