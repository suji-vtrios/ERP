import {
  IsUUID,
  IsInt,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

export class CreateEmployeeLeaveBalanceDto {
  @IsUUID()
  employeeId: string;

  @IsUUID()
  leaveTypeId: string;

  @IsInt()
  year: number;

  @IsNumber()
  entitlement: number;

  @IsOptional()
  @IsNumber()
  used?: number;

  @IsOptional()
  @IsNumber()
  pending?: number;

  @IsOptional()
    @IsNumber()
    balance?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}