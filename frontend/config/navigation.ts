import type { NavigationGroup } from "@/types/navigation";

import {
  Building2,
  ClipboardList,
  FolderKanban,
  LayoutDashboard,
  Settings,
  Shield,
  Users,
} from "lucide-react";

export const navigation: NavigationGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Human Resources",
    items: [
      {
        title: "Employees",
        href: "/hr/employees",
        icon: Users,
      },
      {
        title: "Departments",
        href: "/hr/departments",
        icon: Building2,
      },
      {
        title: "Leave",
        href: "/hr/leave",
        icon: ClipboardList,
      },
      {
        title: "Payroll",
        href: "/hr/payroll",
        icon: ClipboardList,
      },
      {
        title: "Assets",
        href: "/hr/assets",
        icon: ClipboardList,
      },
    ],
  },

  {
    title: "Project Management",
    items: [
      {
        title: "Projects",
        href: "/projects",
        icon: FolderKanban,
      },
    ],
  },

  {
    title: "Administration",
    items: [
      {
        title: "Settings",
        href: "/settings",
        icon: Settings,
      },
      {
        title: "Roles & Permissions",
        href: "/settings/security",
        icon: Shield,
      },
    ],
  },
];