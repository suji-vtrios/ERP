import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateAssetCategoryDto {
  @IsUUID()
  companyId: string;

  @IsString()
  assetCategoryCode: string;

  @IsString()
  assetCategoryName: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}