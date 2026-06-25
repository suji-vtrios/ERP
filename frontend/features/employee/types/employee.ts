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
    name: string;
  };

  branch?: {
    id: string;
    name: string;
  };

  department?: {
    id: string;
    name: string;
  };

  designation?: {
    id: string;
    name: string;
  };

  manager?: {
    id: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
  };
}