import { PartialType } from '@nestjs/swagger';
import { CreateEmployeeAssetDto } from './create-employee-asset.dto';

export class UpdateEmployeeAssetDto extends PartialType(CreateEmployeeAssetDto) {}
