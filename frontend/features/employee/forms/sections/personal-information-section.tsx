"use client";

import { UseFormReturn } from "react-hook-form";

import { Input } from "@/components/ui/input";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

import type { EmployeeFormData } from "../employee-form";

interface PersonalInformationSectionProps {
  form: UseFormReturn<EmployeeFormData>;
}

export function PersonalInformationSection({
  form,
}: PersonalInformationSectionProps) {
  return (
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
  );
}