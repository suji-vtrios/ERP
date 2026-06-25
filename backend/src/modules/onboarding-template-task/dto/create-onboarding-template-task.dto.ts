import {
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

import {
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';

export class CreateOnboardingTemplateTaskDto {
  @ApiProperty({
    example: 'template-uuid',
  })
  @IsUUID()
  onboardingTemplateId: string;

  @ApiProperty({
    example: 'Collect Passport',
  })
  @IsString()
  @MaxLength(200)
  taskName: string;

  @ApiPropertyOptional({
    example: 'Collect passport copy from employee',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(1)
  sequenceNo: number;

  @ApiPropertyOptional({
    example: true,
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isMandatory?: boolean = true;
}