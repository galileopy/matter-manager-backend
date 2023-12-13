import { Role } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString, IsUUID, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(3)
  @Transform(({ value }) => value.toUpperCase())
  abbreviation: string;
}

export class UpdateUserDto {
  @IsString()
  @IsUUID()
  userId: string;

  @IsString()
  username: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsEnum(Role)
  role: Role;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Length(3)
  @Transform(({ value }) => value.toUpperCase())
  abbreviation: string;
}

export class DeleteUserDto {
  @IsString()
  @IsUUID()
  userId: string;
}
