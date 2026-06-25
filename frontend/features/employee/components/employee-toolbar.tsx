"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmployeeDialog } from "../dialogs/employee-dialog";

export function EmployeeToolbar() {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <Input
        placeholder="Search employees..."
        className="max-w-sm"
      />

      <div className="flex gap-2">
        <Button variant="outline">
          Refresh
        </Button>

        <EmployeeDialog />
      </div>
    </div>
  );
}