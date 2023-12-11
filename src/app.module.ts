import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { UsersModule } from './modules/users/users.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    HealthCheckModule,
    UsersModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/browser'),
    }),
    ConfigModule.forRoot(),
    PrismaClient,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
