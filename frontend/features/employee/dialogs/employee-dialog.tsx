"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export function EmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Employee</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>

          <DialogDescription>
            Create a new employee.
          </DialogDescription>
        </DialogHeader>

        <div className="py-8 text-center text-muted-foreground">
          Employee Form Coming Next
        </div>
      </DialogContent>
    </Dialog>
  );
}