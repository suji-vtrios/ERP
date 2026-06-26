"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  FormSection,
  RequiredLabel,
} from "@/components/forms";

type EmployeeFormData = {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

export function EmployeeForm() {
  const form = useForm<EmployeeFormData>({
    defaultValues: {
      employeeCode: "",
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
    },
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data);
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
              Employee Code
            </RequiredLabel>

            <Input
              placeholder="Enter Employee Code"
              {...form.register("employeeCode")}
            />
          </div>

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

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button variant="outline" type="button">
          Cancel
        </Button>

        <Button type="submit">
          Save Employee
        </Button>
      </div>
    </form>
  );
}