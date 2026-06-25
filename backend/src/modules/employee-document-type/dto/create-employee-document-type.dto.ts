import {
  IsBoolean,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmployeeDocumentTypeDto {
  @IsString()
  companyId: string;

  @IsString()
  documentCode: string;

  @IsString()
  documentName: string;

  @IsOptional()
  @IsBoolean()
  isMandatory?: boolean;
}