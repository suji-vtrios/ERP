"use client";

import { Controller, UseFormReturn } from "react-hook-form";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

import { LookupSelect } from "@/components/forms/lookup-select";

import { Input } from "@/components/ui/input";

import { useDesignations } from "@/features/lookups/hooks/use-designations";
import { useManagers } from "@/features/lookups/hooks/use-managers";

import type { EmployeeFormData } from "../employee-form";

interface EmploymentSectionProps {
  form: UseFormReturn<EmployeeFormData>;
}

export function EmploymentSection({
  form,
}: EmploymentSectionProps) {
  const {
    data: designations = [],
    isLoading: designationsLoading,
  } = useDesignations();

  const {
    data: managers = [],
    isLoading: managersLoading,
  } = useManagers();

  return (
    <FormSection title="Employment">
      <div className="grid gap-4 md:grid-cols-2">

        <div className="space-y-2">
          <RequiredLabel>
            Designation
          </RequiredLabel>

          <Controller
            control={form.control}
            name="designationId"
            render={({ field }) => (
              <LookupSelect
                value={field.value}
                onChange={field.onChange}
                items={designations}
                placeholder="Select Designation"
                loading={designationsLoading}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel>
            Reporting Manager
          </RequiredLabel>

          <Controller
            control={form.control}
            name="managerId"
            render={({ field }) => (
              <LookupSelect
                value={field.value}
                onChange={field.onChange}
                items={managers}
                placeholder="Select Reporting Manager"
                loading={managersLoading}
              />
            )}
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel>
            Employee Type
          </RequiredLabel>

          <Input
            placeholder="Employee Type"
            {...form.register("employeeType")}
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel>
            Joining Date
          </RequiredLabel>

          <Input
            type="date"
            {...form.register("joiningDate")}
          />
        </div>

      </div>
    </FormSection>
  );
}