import {
  IsString,
  IsUUID,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class CreateDepartmentDto {

  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsUUID()
  branchId: string;

  @ApiProperty()
  @IsString()
  departmentCode: string;

  @ApiProperty()
  @IsString()
  departmentName: string;
}