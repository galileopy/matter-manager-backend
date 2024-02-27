import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsString()
  name: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  subjectPreText: string;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  includeClientName: boolean;

  @IsString()
  @IsOptional()
  subjectPostText: string;
}

export class UpdateEmaiTemplatelDto {
  @IsString()
  @IsUUID()
  templateId: string;

  @IsString()
  name: string;

  @IsString()
  body: string;

  @IsString()
  @IsOptional()
  subjectPreText: string;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  includeClientName: boolean;

  @IsString()
  @IsOptional()
  subjectPostText: string;
}

export class DeleteEmailTemplateDto {
  @IsString()
  @IsUUID()
  templateId: string;
}
