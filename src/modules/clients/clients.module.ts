import { Module } from '@nestjs/common';
import { ClientController } from './clients.controller';
import { ClientRepository } from './clients.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [ClientController],
  providers: [ClientRepository, PrismaClient],
  exports: [ClientRepository],
})
export class ClientModule {}
