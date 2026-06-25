import {
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';

export class CompleteSeparationDto {
  @IsUUID()
  separationId: string;

  @IsUUID()
  completedById: string;

  @IsOptional()
  @IsString()
  clearanceRemarks?: string;
}