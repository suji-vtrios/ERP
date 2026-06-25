import { IsString } from 'class-validator';

export class CreateAssetTypeDto {
  @IsString()
  companyId: string;

  @IsString()
  assetTypeCode: string;

  @IsString()
  assetTypeName: string;
}