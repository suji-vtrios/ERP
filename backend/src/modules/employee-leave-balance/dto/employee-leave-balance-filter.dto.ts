import {
  IsOptional,
  IsUUID,
  IsInt,
} from 'class-validator';

export class EmployeeLeaveBalanceFilterDto {
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsUUID()
  leaveTypeId?: string;

  @IsOptional()
  @IsInt()
  year?: number;
}