import { Module } from '@nestjs/common';
import { InternalNotesController } from './internal-notes.controller';
import { InternalNotesRepository } from './internal-notes.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [InternalNotesController],
  providers: [InternalNotesRepository, PrismaClient],
  exports: [InternalNotesRepository],
})
export class InternalNotesModule {}
