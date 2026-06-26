export interface Employee {
  id: string;

  employeeCode: string;

  firstName: string;

  lastName: string;

  email?: string;

  phone?: string;

  employmentStatus: string;

  isActive: boolean;

  company?: {
    id: string;
    companyCode: string;
    companyName: string;
  };

  branch?: {
    id: string;
    branchCode: string;
    branchName: string;
  };

  department?: {
    id: string;
    departmentCode: string;
    departmentName: string;
  };

  designation?: {
    id: string;
    designationCode: string;
    designationName: string;
  };

  manager?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
  };
}