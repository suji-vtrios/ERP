import { z } from "zod";

export const employeeSchema = z.object({
  employeeCode: z.string().min(1, "Employee code is required"),

  companyId: z.string().uuid(),

  branchId: z.string().uuid(),

  departmentId: z.string().uuid(),

  firstName: z.string().min(1, "First name is required"),

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

export type EmployeeFormValues = z.infer<
  typeof employeeSchema
>;