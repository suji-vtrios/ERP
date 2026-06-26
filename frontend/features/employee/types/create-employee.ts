export interface CreateEmployee {
  employeeCode: string;

  companyId: string;

  branchId: string;

  departmentId: string;

  firstName: string;

  lastName?: string;

  email?: string;

  mobile?: string;

  designationId?: string;

  joiningDate?: Date;

  employeeType?: string;

  managerId?: string;
}