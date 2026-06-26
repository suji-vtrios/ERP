import { apiClient } from "@/services/api-client";

import type { ApiResponse } from "@/types/api-response";
import type {
  LookupItem,
  CompanyLookup,
  BranchLookup,
  DepartmentLookup,
  DesignationLookup,
} from "../types";

import type { Employee } from "@/features/employee/types/employee";

export const LookupService = {
  async getCompanies(): Promise<LookupItem[]> {
    const response =
      await apiClient.get<ApiResponse<CompanyLookup[]>>("/companies");

    return response.data.data.map((company) => ({
      id: company.id,
      code: company.companyCode,
      name: company.companyName,
    }));
  },

  async getBranches(
    companyId?: string,
  ): Promise<LookupItem[]> {

    const response =
      await apiClient.get<ApiResponse<BranchLookup[]>>(
        "/branches",
        {
          params: companyId
            ? { companyId }
            : undefined,
        },
      );

    return response.data.data.map((branch) => ({
      id: branch.id,
      code: branch.branchCode,
      name: branch.branchName,
    }));
  },

  async getDepartments(
    branchId?: string,
  ): Promise<LookupItem[]> {

    const response =
      await apiClient.get<ApiResponse<DepartmentLookup[]>>(
        "/departments",
        {
          params: branchId
            ? { branchId }
            : undefined,
        },
      );

    return response.data.data.map((department) => ({
      id: department.id,
      code: department.departmentCode,
      name: department.departmentName,
    }));
  },

  async getDesignations(): Promise<LookupItem[]> {
    const response =
      await apiClient.get<ApiResponse<DesignationLookup[]>>("/designations");

    return response.data.data.map((designation) => ({
      id: designation.id,
      code: designation.designationCode,
      name: designation.designationName,
    }));
  },

  async getManagers(): Promise<LookupItem[]> {
    const response =
      await apiClient.get<ApiResponse<Employee[]>>("/employees");

    return response.data.data.map((employee) => ({
      id: employee.id,
      code: employee.employeeCode,
      name: `${employee.firstName} ${employee.lastName ?? ""}`.trim(),
    }));
  },
};