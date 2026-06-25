import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({
  children,
  className,
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-6",
        className
      )}
    >
      {children}
    </div>
  );
}