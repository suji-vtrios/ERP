"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export function EmployeeForm() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Test" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="1">One</SelectItem>
      </SelectContent>
    </Select>
  );
}