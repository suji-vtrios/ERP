import {
  IsUUID,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeSeparationDto {
  @IsUUID()
  employeeId: string;

  @IsString()
  separationType: string;

  @IsOptional()
  @IsDateString()
  resignationDate?: string;

  @IsOptional()
  @IsDateString()
  lastWorkingDate?: string;

  @IsOptional()
  @IsString()
  reason?: string;
}