import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCompanySettingDto {
  @ApiProperty()
  @IsUUID()
  companyId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  settingKey: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  settingValue: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}