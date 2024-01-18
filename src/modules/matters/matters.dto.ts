import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateMatterDto {
  @IsString()
  @IsUUID()
  clientId: string;

  @IsString()
  @IsUUID()
  statusId: string;

  @IsString()
  project: string;

  @IsString()
  fileNumber: string;

  @IsDateString()
  closedAt: string;

  @IsBoolean()
  needsWrittenConfirmation: boolean;
}

export class UpdateMatterDto {
  @IsString()
  @IsUUID()
  matterId: string;

  @IsString()
  @IsUUID()
  statusId: string;

  @IsString()
  project: string;

  @IsString()
  fileNumber: string;

  @IsDateString()
  closedAt: string;

  @IsBoolean()
  needsWrittenConfirmation: boolean;
}

export class DeleteMatterDto {
  @IsString()
  @IsUUID()
  matterId: string;
}

export class ConfirmMatterDto {
  @IsString()
  @IsUUID()
  matterId: string;
}

export class CloseMatterDto {
  @IsString()
  @IsUUID()
  matterId: string;
}
