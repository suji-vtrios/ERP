import { apiClient } from "@/services/api-client";

import type { ApiResponse } from "@/types/api-response";
import type { Employee } from "../types/employee";
import type { CreateEmployee } from "../types/create-employee";

export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const response =
      await apiClient.get<ApiResponse<Employee[]>>("/employees");

    return response.data.data;
  },

  async create(data: CreateEmployee) {
    const response =
      await apiClient.post<ApiResponse<Employee>>(
        "/employees",
        data,
      );

    return response.data.data;
  }
};