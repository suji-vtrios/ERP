"use client";

import { DataTable } from "@/components/tables/data-table";

import { useEmployees } from "../hooks/use-employees";
import { employeeColumns } from "./employee-columns";

export function EmployeeTable() {
  const {
    data = [],
    isLoading,
    error,
  } = useEmployees();

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  if (error) {
    console.error(error);

    return (
        <pre className="text-red-500">
        {JSON.stringify(error, null, 2)}
        </pre>
    );
    }

  return (
    <DataTable
      columns={employeeColumns}
      data={data}
    />
  );
}