export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  TIMEOUT: 30000,
} as const;

export const API_ENDPOINTS = {
  dashboard: {
    payrollSummary: "/payroll/dashboard/company-summary",
    monthlySummary: "/payroll/dashboard/monthly-summary",
  },

  employees: {
    list: "/employees",
    create: "/employees",
  },

  projects: {
    list: "/projects",
    create: "/projects",
  },

  payroll: {
    list: "/payroll",
    process: "/payroll/process",
  },
} as const;