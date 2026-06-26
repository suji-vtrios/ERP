"use client";

import { useState } from "react";

import { EmployeeToolbar } from "./employee-toolbar";
import { EmployeeTable } from "./employee-table";
import { EmployeeDialog } from "./employee-dialog";

import { KpiCard } from "@/components/common/kpi-card";

import { useEmployeeSummary } from "../hooks/use-employee-summary";
import type { Employee } from "../types/employee";

export function EmployeeWorkspace() {
  const [open, setOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const {
    data: summary = [],
    isLoading: summaryLoading,
  } = useEmployeeSummary();

  const handleCreate = () => {
    setSelectedEmployee(null);
    setOpen(true);
  };

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee);
    setOpen(true);
  };

  return (
    <>
      <EmployeeToolbar onAdd={handleCreate} />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <KpiCard
                key={index}
                title="Loading..."
                value={0}
              />
            ))
          : summary.map((item) => (
              <KpiCard
                key={item.key}
                title={item.label}
                value={item.value}
              />
            ))}
      </div>

      <EmployeeTable
        onEdit={handleEdit}
      />

      <EmployeeDialog
        open={open}
        onOpenChange={setOpen}
        employee={selectedEmployee}
      />
    </>
  );
}