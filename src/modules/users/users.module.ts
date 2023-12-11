import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersRepository, PrismaClient],
  exports: [UsersRepository],
})
export class UsersModule {}
