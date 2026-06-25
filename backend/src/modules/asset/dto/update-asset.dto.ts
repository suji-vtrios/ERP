import { PartialType } from '@nestjs/mapped-types';
import { CreateAssetDto } from './create-asset.dto';

import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateAssetDto extends PartialType(
  CreateAssetDto,
) {
  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  serialNumber?: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  modelNumber?: string;
}