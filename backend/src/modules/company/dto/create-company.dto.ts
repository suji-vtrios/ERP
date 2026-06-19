import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateCompanyDto {

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  companyGroupId?: string;

  @ApiProperty()
  @IsString()
  companyCode: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  registrationNo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  taxNumber?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUUID()
  parentCompanyId?: string;
}