import {
  IsString,
  IsOptional,
} from 'class-validator';

export class ProcessLeaveRequestDto {
  @IsOptional()
  @IsString()
  remarks?: string;
}