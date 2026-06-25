import { cn } from "@/lib/utils";

interface RequiredLabelProps {
  children: React.ReactNode;
  required?: boolean;
}

export function RequiredLabel({
  children,
  required = false,
}: RequiredLabelProps) {
  return (
    <label
      className={cn(
        "text-sm font-medium leading-none"
      )}
    >
      {children}

      {required && (
        <span className="ml-1 text-destructive">
          *
        </span>
      )}
    </label>
  );
}