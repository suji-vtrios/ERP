import { useQuery } from "@tanstack/react-query";

import { LookupService } from "../services/lookup.service";

export function useCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: LookupService.getCompanies,
  });
}

export function useBranches(
  companyId?: string,
) {
  return useQuery({
    queryKey: ["branches", companyId],

    queryFn: () =>
      LookupService.getBranches(companyId),

    enabled: !!companyId,
  });
}

export function useDepartments(
  branchId?: string,
) {
  return useQuery({
    queryKey: ["departments", branchId],

    queryFn: () =>
      LookupService.getDepartments(branchId),

    enabled: !!branchId,
  });
}

export function useDesignations() {
  return useQuery({
    queryKey: ["designations"],
    queryFn: LookupService.getDesignations,
  });
}

export function useManagers() {
  return useQuery({
    queryKey: ["managers"],
    queryFn: LookupService.getManagers,
  });
}