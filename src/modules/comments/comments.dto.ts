import { IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsUUID()
  matterId: string;

  @IsString()
  comment: string;
}
