"use client";

import {
  MoreHorizontal,
  Eye,
  Pencil,
  FolderOpen,
  Laptop,
  CalendarDays,
  Wallet,
  UserX,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import type { Employee } from "../types/employee";

interface EmployeeActionsProps {
  employee: Employee;
}

export function EmployeeActions({
  employee,
}: EmployeeActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => console.log("View", employee.id)}
        >
          <Eye className="mr-2 h-4 w-4" />
          View Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => console.log("Edit", employee.id)}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Edit Employee
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <FolderOpen className="mr-2 h-4 w-4" />
          Documents
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Laptop className="mr-2 h-4 w-4" />
          Assets
        </DropdownMenuItem>

        <DropdownMenuItem>
          <CalendarDays className="mr-2 h-4 w-4" />
          Leave History
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Wallet className="mr-2 h-4 w-4" />
          Payroll
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600">
          <UserX className="mr-2 h-4 w-4" />
          Deactivate
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}