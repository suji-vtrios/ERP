import { z } from "zod";

export const createEmployeeSchema = z.object({
  employeeCode: z
    .string()
    .min(1, "Employee Code is required"),

  companyId: z
    .string()
    .min(1, "Company is required"),

  branchId: z
    .string()
    .min(1, "Branch is required"),

  departmentId: z
    .string()
    .min(1, "Department is required"),

  firstName: z
    .string()
    .min(1, "First Name is required"),

  lastName: z.string().optional(),

  email: z
    .string()
    .email("Invalid email")
    .optional()
    .or(z.literal("")),

  mobile: z.string().optional(),

  designationId: z.string().optional(),

  joiningDate: z.string().optional(),

  employeeType: z.string().optional(),

  managerId: z.string().optional(),
});

export type CreateEmployeeForm = z.infer<
  typeof createEmployeeSchema
>;