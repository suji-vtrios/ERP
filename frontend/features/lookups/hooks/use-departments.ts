"use client";

import { useQuery } from "@tanstack/react-query";
import { LookupService } from "../services";

export function useDepartments(branchId?: string) {
  return useQuery({
    queryKey: ["departments", branchId],
    queryFn: () => LookupService.getDepartments(branchId),
    enabled: !!branchId,
  });
}