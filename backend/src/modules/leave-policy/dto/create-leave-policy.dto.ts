import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateLeavePolicyDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsUUID()
  branchId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  departmentId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  designationId?: string;

  @ApiProperty()
  @IsUUID()
  leaveTypeId: string;

  @ApiProperty()
  @IsNumber()
  annualEntitlement: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  carryForwardLimit?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  maxConsecutiveDays?: number;

  @ApiProperty()
  @IsBoolean()
  allowNegativeBalance: boolean;
}