import {
  IsOptional,
  IsString,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class UpdateShiftDto {
  @IsOptional()
  @IsString()
  shiftName?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsString()
  endTime?: string;

  @IsOptional()
  @IsInt()
  breakMinutes?: number;

  @IsOptional()
  @IsInt()
  graceMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isNightShift?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}