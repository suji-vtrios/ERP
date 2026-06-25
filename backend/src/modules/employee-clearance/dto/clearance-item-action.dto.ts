import {
  IsOptional,
  IsString,
} from 'class-validator';

export class ClearanceItemActionDto {
  @IsOptional()
  @IsString()
  clearedById?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}