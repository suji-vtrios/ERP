import {
  IsBoolean,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateHrRequestTypeDto {
  @IsUUID()
  companyId: string;

  @IsString()
  requestCode: string;

  @IsString()
  requestName: string;

  @IsOptional()
  @IsBoolean()
  requiresApproval?: boolean;

  @IsOptional()
  @IsBoolean()
  autoGenerate?: boolean;

  @IsOptional()
  @IsUUID()
  workflowId?: string;
}