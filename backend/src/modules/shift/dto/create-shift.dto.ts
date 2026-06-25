import {
  IsString,
  IsOptional,
  IsBoolean,
  IsInt,
} from 'class-validator';

export class CreateShiftDto {
  @IsString()
  shiftCode: string;

  @IsString()
  shiftName: string;

  @IsString()
  startTime: string;

  @IsString()
  endTime: string;

  @IsOptional()
  @IsInt()
  breakMinutes?: number;

  @IsOptional()
  @IsInt()
  graceMinutes?: number;

  @IsOptional()
  @IsBoolean()
  isNightShift?: boolean;
}