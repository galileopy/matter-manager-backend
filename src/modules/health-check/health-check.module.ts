import { Module } from '@nestjs/common';
import { HealthCheckController } from './health-check.controller';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [HealthCheckController],
  providers: [],
})
export class HealthCheckModule {}
