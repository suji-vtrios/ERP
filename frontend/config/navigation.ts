import {
  Building2,
  FolderKanban,
  LayoutDashboard,
  Package,
  Settings,
  Users,
} from "lucide-react";

export const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "HR",
    icon: Users,
    children: [
      {
        title: "Employees",
        href: "/hr/employees",
      },
      {
        title: "Departments",
        href: "/hr/departments",
      },
      {
        title: "Leave",
        href: "/hr/leave",
      },
      {
        title: "Payroll",
        href: "/hr/payroll",
      },
    ],
  },
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    title: "Assets",
    icon: Package,
    href: "/assets",
  },
  {
    title: "Company",
    icon: Building2,
    href: "/company",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];