import {
  IsString,
  IsUUID,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';

export class CreateBranchDto {

  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsString()
  branchCode: string;

  @ApiProperty()
  @IsString()
  branchName: string;
}