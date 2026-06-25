import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class ReturnAssetDto {
  @IsDateString()
  returnedDate: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}