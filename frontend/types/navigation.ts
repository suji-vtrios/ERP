import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  title: string;

  href?: string;

  icon?: LucideIcon;

  children?: NavigationItem[];

  permissions?: string[];

  badge?: string | number;

  disabled?: boolean;
}

export interface NavigationGroup {
  title: string;

  items: NavigationItem[];
}