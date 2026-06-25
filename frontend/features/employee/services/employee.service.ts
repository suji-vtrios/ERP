import { apiClient } from "@/services/api-client";

import type { ApiResponse } from "@/types/api-response";
import type { Employee } from "../types/employee";

export const EmployeeService = {
  async getAll(): Promise<Employee[]> {
    const response =
      await apiClient.get<ApiResponse<Employee[]>>("/employees");

    return response.data.data;
  },
};