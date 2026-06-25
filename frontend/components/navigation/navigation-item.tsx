"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavigationItem as NavigationItemType } from "@/types/navigation";

interface NavigationItemProps {
  item: NavigationItemType;
}

export function NavigationItem({ item }: NavigationItemProps) {
  const pathname = usePathname();

  const isActive =
    item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href ?? "");

  const Icon = item.icon;

  return (
    <Link
      href={item.href ?? "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}

      <span className="flex-1">{item.title}</span>

      {item.badge && (
        <span className="rounded bg-primary/10 px-2 py-0.5 text-xs">
          {item.badge}
        </span>
      )}
    </Link>
  );
}