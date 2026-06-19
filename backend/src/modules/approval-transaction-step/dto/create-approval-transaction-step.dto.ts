import {
  IsOptional,
  IsString,
  IsUUID,
  IsInt,
} from 'class-validator';

export class CreateApprovalTransactionStepDto {
  @IsUUID()
  transactionId: string;

  @IsInt()
  stepNo: number;

  @IsOptional()
  @IsUUID()
  approverId?: string;
}