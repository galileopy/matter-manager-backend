import {
  IsBoolean,
  IsDateString,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
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
  @Matches(/\d{6}-\d{3}$/, {
    message: 'File number must be in XXXXXX-XXX format',
  })
  fileNumber: string;

  @IsDateString()
  @IsOptional()
  closedAt: string;

  @IsDateString()
  @IsOptional()
  confirmedAt: string;

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
  @Matches(/\d{6}-\d{3}$/, {
    message: 'File number must be in XXXXXX-XXX format',
  })
  fileNumber: string;

  @IsDateString()
  @IsOptional()
  closedAt: string;

  @IsDateString()
  @IsOptional()
  confirmedAt: string;

  @IsBoolean()
  needsWrittenConfirmation: boolean;
}

export class DeleteMatterDto {
  @IsString()
  @IsUUID()
  matterId: string;
}
