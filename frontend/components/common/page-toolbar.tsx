import { ReactNode } from "react";

interface PageToolbarProps {
  children: ReactNode;
}

export function PageToolbar({
  children,
}: PageToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {children}
    </div>
  );
}