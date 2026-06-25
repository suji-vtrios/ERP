import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateLeaveTypeDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsString()
  leaveCode: string;

  @ApiProperty()
  @IsString()
  leaveName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsBoolean()
  isPaid: boolean;

  @ApiProperty()
  @IsBoolean()
  requiresApproval: boolean;

  @ApiProperty()
  @IsBoolean()
  allowHalfDay: boolean;

  @ApiProperty()
  @IsBoolean()
  carryForwardAllowed: boolean;
}