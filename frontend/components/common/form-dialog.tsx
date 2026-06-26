"use client";

import { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";

type DialogSize =
  | "sm"
  | "md"
  | "lg"
  | "xl";

interface FormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description?: string;

  size?: DialogSize;

  children: ReactNode;
}

const sizes: Record<DialogSize, string> = {
  sm: "max-w-md",
  md: "max-w-2xl",
  lg: "max-w-4xl",
  xl: "max-w-6xl",
};

export function FormDialog({
  open,
  onOpenChange,
  title,
  description,
  size = "lg",
  children,
}: FormDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent
        className={cn(
          "w-[95vw] max-h-[90vh] overflow-hidden p-0",
          sizes[size]
        )}
      >
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>{title}</DialogTitle>

          {description && (
            <DialogDescription>
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="overflow-y-auto p-6">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}