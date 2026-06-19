import {
  IsString,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateDesignationDto {

  @ApiProperty()
  @IsString()
  designationCode: string;

  @ApiProperty()
  @IsString()
  designationName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  level?: number;
}