"use client";

import { useQuery } from "@tanstack/react-query";

import { EmployeeService } from "../services/employee.service";

export function useEmployees() {
  return useQuery({
    queryKey: ["employees"],
    queryFn: EmployeeService.getAll,
  });
}