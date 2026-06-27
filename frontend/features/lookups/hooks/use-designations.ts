"use client";

import { useQuery } from "@tanstack/react-query";

import { LookupService } from "../services/lookup.service";

export function useDesignations() {
  return useQuery({
    queryKey: ["designations"],
    queryFn: LookupService.getDesignations,
    staleTime: 1000 * 60 * 30,
  });
}