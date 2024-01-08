import { ClientType } from '@prisma/client';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateClientsDto {
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

export class UpdateClientsDto {
  @IsString()
  @IsUUID()
  clientId: string;

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

export class DeleteClientsDto {
  @IsString()
  @IsUUID()
  clientId: string;
}
