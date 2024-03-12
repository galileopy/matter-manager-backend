import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [],
  controllers: [],
  providers: [EmailService, PrismaClient],
  exports: [EmailService],
})
export class ServicesModule {}
