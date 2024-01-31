import { IsString, IsUUID } from 'class-validator';

export class CreateInternalNoteDto {
  @IsString()
  @IsUUID()
  matterId: string;

  @IsString()
  @IsUUID()
  addedBy: string;

  @IsString()
  note: string;
}

export class UpdateInternalNoteDto {
  @IsString()
  @IsUUID()
  internalNoteId: string;

  @IsString()
  note: string;
}

export class DeleteInternalNoteDto {
  @IsString()
  @IsUUID()
  internalNoteId: string;
}
