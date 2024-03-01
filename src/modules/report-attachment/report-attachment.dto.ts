import { ClientType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class Example {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  suffix: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsEnum(ClientType)
  @MinLength(1)
  type: ClientType;
}
