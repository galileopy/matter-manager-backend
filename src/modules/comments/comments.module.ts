import { Module } from '@nestjs/common';
import { InternalNotesController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [InternalNotesController],
  providers: [CommentsRepository, PrismaClient],
  exports: [CommentsRepository],
})
export class CommentsModule {}
