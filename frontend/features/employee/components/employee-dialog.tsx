"use client";

import { FormDialog } from "@/components/common/form-dialog";

import { EmployeeForm } from "../forms/employee-form";
import type { Employee } from "../types/employee";

interface EmployeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: Employee | null;
}

export function EmployeeDialog({
  open,
  onOpenChange,
  employee,
}: EmployeeDialogProps) {
  return (
    <FormDialog
      open={open}
      onOpenChange={onOpenChange}
      title={
        employee
          ? "Edit Employee"
          : "Add Employee"
      }
      description={
        employee
          ? "Update employee information."
          : "Create a new employee record."
      }
      size="xl"
    >
      <EmployeeForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
        />
    </FormDialog>
  );
}