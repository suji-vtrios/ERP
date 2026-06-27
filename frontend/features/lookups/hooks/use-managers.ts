"use client";

import { useQuery } from "@tanstack/react-query";

import { LookupService } from "../services/lookup.service";

export function useManagers() {
  return useQuery({
    queryKey: ["managers"],
    queryFn: LookupService.getManagers,
    staleTime: 1000 * 60 * 30,
  });
}