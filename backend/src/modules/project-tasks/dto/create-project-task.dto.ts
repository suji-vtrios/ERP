import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProjectTaskDto {
  @ApiProperty()
  @IsUUID()
  projectId: string;

  @ApiProperty()
  @IsUUID()
  stageId: string;

  @ApiProperty()
  @IsString()
  taskCode: string;

  @ApiProperty()
  @IsString()
  taskName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  plannedHours?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  estimatedReviewHours?: number;
}