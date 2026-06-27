import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed p-12">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">

        <Icon className="mb-4 h-12 w-12 text-muted-foreground" />

        <h3 className="text-lg font-semibold">
          {title}
        </h3>

        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>

        {actionLabel && (
          <Button
            className="mt-6"
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        )}

      </div>
    </div>
  );
}