import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';

export class CreateEmailDto {
  @IsString()
  @IsUUID()
  clientId: string;

  @IsString()
  memberName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  shouldSendReport: boolean;
}

export class UpdateEmailDto {
  @IsString()
  @IsUUID()
  emailId: string;

  @IsString()
  memberName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsBoolean()
  @Transform(({ value }) => String(value) === 'true')
  shouldSendReport: boolean;
}

export class DeleteEmailDto {
  @IsString()
  @IsUUID()
  emailId: string;
}
