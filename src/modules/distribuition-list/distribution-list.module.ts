import { Module } from '@nestjs/common';
import { DistributionListController } from './distribution-list.controller';
import { DistributionListRepository } from './distribution-list.repository';
import { PrismaClient } from '@prisma/client';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [DistributionListController],
  providers: [DistributionListRepository, PrismaClient],
  exports: [DistributionListRepository],
})
export class DistributionListModule {}
