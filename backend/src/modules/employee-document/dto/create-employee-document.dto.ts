import {
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateEmployeeDocumentDto {
  @IsString()
  employeeId: string;

  @IsString()
  documentTypeId: string;

  @IsOptional()
  @IsString()
  documentNumber?: string;

  @IsOptional()
  @IsDateString()
  issueDate?: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsString()
  filePath?: string;

  @IsOptional()
  @IsString()
  remarks?: string;
}