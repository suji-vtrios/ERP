import {
  IsUUID,
  IsString,
} from 'class-validator';

export class ProcessSeparationDto {
  @IsUUID()
  transactionId: string;

  @IsUUID()
  approverId: string;

  @IsString()
  action: string;

  @IsString()
  remarks: string;
}