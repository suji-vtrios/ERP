import {
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateAssetDto {
  @IsString()
  companyId: string;

  @IsString()
  assetCode: string;

  @IsString()
  assetName: string;

  @IsString()
  assetTypeId: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsDateString()
  purchaseDate?: string;
}