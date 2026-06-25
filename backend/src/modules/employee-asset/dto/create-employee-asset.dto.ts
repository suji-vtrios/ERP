import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeAssetDto {
  @IsString()
  employeeId: string;

  @IsString()
  assetId: string;

  @IsDateString()
  assignedDate: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}