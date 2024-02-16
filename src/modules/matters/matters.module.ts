import { Module } from '@nestjs/common';
import { MatterController } from './matters.controller';
import { MatterRepository } from './matters.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';
import { AssignmentsRepository } from './assignments.repository';

@Module({
  imports: [ServicesModule],
  controllers: [MatterController],
  providers: [MatterRepository, AssignmentsRepository, PrismaClient],
  exports: [MatterRepository, AssignmentsRepository],
})
export class MatterModule {}
