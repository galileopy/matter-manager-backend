import { Module } from '@nestjs/common';
import { HealthCheckModule } from './routes/health-check/health-check.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    HealthCheckModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/browser'),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
