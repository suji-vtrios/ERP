import {
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateWorkScheduleItemDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  plannedHours?: number;

  @IsOptional()
  @IsString()
  status?: string;
}