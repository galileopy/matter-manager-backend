import { Module } from '@nestjs/common';
import { MatterController } from './matters.controller';
import { MatterRepository } from './matters.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [MatterController],
  providers: [MatterRepository, PrismaClient],
  exports: [MatterRepository],
})
export class MatterModule {}
