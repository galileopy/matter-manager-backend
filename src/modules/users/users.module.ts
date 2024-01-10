import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UserRepository } from './users.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [UserController],
  providers: [UserRepository, PrismaClient],
  exports: [UserRepository],
})
export class UserModule {}
