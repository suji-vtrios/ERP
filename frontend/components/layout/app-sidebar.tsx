"use client";

import { NavigationMenu } from "@/components/navigation/navigation-menu";

export function AppSidebar() {
  return (
    <aside className="flex w-64 flex-col border-r bg-card">
      {/* Logo */}
      <div className="border-b p-6">
        <h2 className="text-xl font-bold">Group ERP</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Enterprise Platform
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-4">
        <NavigationMenu />
      </div>

      {/* Footer */}
      <div className="border-t p-4 text-sm text-muted-foreground">
        Version 1.0
      </div>
    </aside>
  );
}