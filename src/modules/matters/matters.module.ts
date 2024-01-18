import { Module } from '@nestjs/common';
import { MatterController } from './matters.controller';
import { MatterRepository } from './matters.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';
import { MatterStatusRepository } from './matters-status.repository';

@Module({
  imports: [ServicesModule],
  controllers: [MatterController],
  providers: [MatterRepository, MatterStatusRepository, PrismaClient],
  exports: [MatterRepository, MatterStatusRepository],
})
export class MatterModule {}
