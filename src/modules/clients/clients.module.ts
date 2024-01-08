import { Module } from '@nestjs/common';
import { UsersController } from './clients.controller';
import { ClientsRepository } from './clients.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [UsersController],
  providers: [ClientsRepository, PrismaClient],
  exports: [ClientsRepository],
})
export class ClientsModule {}
