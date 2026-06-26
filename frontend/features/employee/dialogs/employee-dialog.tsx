"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmployeeForm } from "../forms/employee-form-old";

export function EmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>

      <DialogContent  className="sm:max-w-5xl max-h-[90vh] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>

          <DialogDescription>
            Create a new employee.
          </DialogDescription>
        </DialogHeader>

        <div className="py-8 text-center text-muted-foreground">
          <EmployeeForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}