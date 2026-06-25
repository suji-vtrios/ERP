import {
  IsOptional,
  IsUUID,
  IsString,
} from 'class-validator';

export class SeparationFilterDto {
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  separationType?: string;
}