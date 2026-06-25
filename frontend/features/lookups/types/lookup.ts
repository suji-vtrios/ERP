export interface LookupItem {
  id: string;
  code?: string;
  name: string;
}

export interface CompanyLookup {
  id: string;
  companyCode: string;
  companyName: string;
}

export interface BranchLookup {
  id: string;
  branchCode: string;
  branchName: string;
}

export interface DepartmentLookup {
  id: string;
  departmentCode: string;
  departmentName: string;
}

export interface DesignationLookup {
  id: string;
  designationCode: string;
  designationName: string;
}