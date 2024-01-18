import { IsString, IsUUID } from 'class-validator';

export class CreateMatterStatusDto {
  @IsString()
  status: string;
}

export class UpdateMatterStatusDto {
  @IsString()
  @IsUUID()
  statusId: string;

  @IsString()
  status: string;
}

export class DeleteMatterStatusDto {
  @IsString()
  @IsUUID()
  statusId: string;
}
