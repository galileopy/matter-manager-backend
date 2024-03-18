import { IsString, IsUUID } from 'class-validator';

export class UpdateEmailTemplateDto {
  @IsString()
  @IsUUID()
  emailTemplateId: string;
}
