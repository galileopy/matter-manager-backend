import { Module } from '@nestjs/common';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [EmailController],
  providers: [EmailRepository, PrismaClient],
  exports: [EmailRepository],
})
export class EmailModule {}
