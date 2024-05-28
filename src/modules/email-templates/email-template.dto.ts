import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateEmailTemplateDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  subjectPreText: string = null;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  includeClientName: boolean;

  @IsString()
  @IsOptional()
  subjectPostText: string = null;
}

export class UpdateEmaiTemplatelDto {
  @IsString()
  @IsUUID()
  templateId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  subjectPreText: string = null;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  includeClientName: boolean;

  @IsString()
  @IsOptional()
  subjectPostText: string = null;
}

export class UpdateEmaiTemplatelBodyDto {
  @IsString()
  @IsUUID()
  templateId: string;

  @IsString()
  body: string;
}

export class DeleteEmailTemplateDto {
  @IsString()
  @IsUUID()
  templateId: string;
}
