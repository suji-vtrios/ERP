"use client";

import { useQuery } from "@tanstack/react-query";
import { LookupService } from "../services";

export function useBranches(companyId?: string) {
  return useQuery({
    queryKey: ["branches", companyId],
    queryFn: () => LookupService.getBranches(companyId),
    enabled: !!companyId,
  });
}