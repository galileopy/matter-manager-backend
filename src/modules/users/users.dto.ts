import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @Length(3, 3)
  @Transform(({ value }) => value.toUpperCase())
  @Matches('^[a-zA-Z\\s]+$', undefined, { each: true })
  abbreviation: string;
}

export class UpdateUserDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  @MinLength(1)
  username: string;

  @IsString()
  @IsOptional()
  @MinLength(1)
  @IsEmail()
  email: string;

  @IsEnum(Role)
  @MinLength(1)
  role: Role;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsString()
  @Length(3, 3)
  @Transform(({ value }) => value.toUpperCase())
  @Matches('^[a-zA-Z\\s]+$', undefined, { each: true })
  abbreviation: string;
}

export class DeleteUserDto {
  @IsString()
  @IsUUID()
  userId: string;
}
