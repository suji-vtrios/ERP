import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsUUID } from 'class-validator';

export class CreateHrRequestDto {
  @ApiProperty()
  @IsUUID()
  employeeId: string;

  @ApiProperty()
  @IsUUID()
  requestTypeId: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  remarks?: string;
}