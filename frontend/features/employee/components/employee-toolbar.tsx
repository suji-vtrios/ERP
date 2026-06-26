"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PageToolbar } from "@/components/common/page-toolbar";

interface EmployeeToolbarProps {
  onAdd: () => void;
}

export function EmployeeToolbar({
  onAdd,
}: EmployeeToolbarProps) {
  return (
    <PageToolbar>
      <Input
        placeholder="Search employees..."
        className="max-w-sm"
      />

      <div className="flex gap-2">
        <Button variant="outline">
          Refresh
        </Button>

        <Button onClick={onAdd}>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </div>
    </PageToolbar>
  );
}