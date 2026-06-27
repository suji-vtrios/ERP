import { apiClient } from "@/services/api-client";

import type { ApiResponse } from "@/types/api-response";

import type { Employee } from "../types/employee";
import type { CreateEmployee } from "../types/create-employee";
import type { UpdateEmployee } from "../types/update-employee";
import type { EmployeeSummary } from "../types/employee-summary";

function normalizeEmployeePayload(
  data: CreateEmployee | UpdateEmployee,
) {
  return Object.fromEntries(
    Object.entries(data).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined,
    ),
  );
}

export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const response =
      await apiClient.get<ApiResponse<Employee[]>>(
        "/employees",
      );

    return response.data.data;
  },

  async create(data: CreateEmployee) {
    const payload = normalizeEmployeePayload(data);

    const response =
      await apiClient.post<ApiResponse<Employee>>(
        "/employees",
        payload,
      );

    return response.data.data;
  },

  async update(
    id: string,
    data: UpdateEmployee,
  ) {
    const payload = normalizeEmployeePayload(data);

    const response =
      await apiClient.patch<ApiResponse<Employee>>(
        `/employees/${id}`,
        payload,
      );

    return response.data.data;
  },

  async summary(): Promise<EmployeeSummary[]> {
    const response =
      await apiClient.get<ApiResponse<EmployeeSummary[]>>(
        "/employees/summary",
      );

    return response.data.data;
  },
};