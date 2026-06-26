import { apiClient } from "@/services/api-client";

import type { ApiResponse } from "@/types/api-response";
import type { Employee } from "../types/employee";
import type { CreateEmployee } from "../types/create-employee";
import type { EmployeeSummary } from "../types/employee-summary";

export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const response =
      await apiClient.get<ApiResponse<Employee[]>>("/employees");

    return response.data.data;
  },

  async create(data: CreateEmployee) {
    const payload = {
      ...data,
      designationId: data.designationId || undefined,
      managerId: data.managerId || undefined,
      joiningDate: data.joiningDate || undefined,
      employeeType: data.employeeType || undefined,
    };

    const response = await apiClient.post<ApiResponse<Employee>>(
      "/employees",
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