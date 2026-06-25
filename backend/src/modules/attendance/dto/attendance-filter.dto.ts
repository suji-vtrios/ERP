import {
  IsOptional,
  IsUUID,
  IsString,
} from 'class-validator';

export class AttendanceFilterDto {
  @IsOptional()
  @IsUUID()
  employeeId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}