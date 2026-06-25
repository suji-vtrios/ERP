import { ReactNode } from "react";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <AppSidebar />

      <div className="flex flex-1 flex-col">
        <AppHeader />

        <main className="flex-1 overflow-auto p-6">{children}</main>

        <AppFooter />
      </div>
    </div>
  );
}