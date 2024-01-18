import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HealthCheckModule } from './modules/health-check/health-check.module';
import { ServicesModule } from './services/services.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './middleware/auth.guard';
import { ClientModule } from './modules/clients/clients.module';
import { EmailModule } from './modules/emails/emails.module';
import { MatterModule } from './modules/matters/matters.module';

@Module({
  imports: [
    HealthCheckModule,
    UserModule,
    ClientModule,
    EmailModule,
    MatterModule,
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend/browser'),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaClient,
    ServicesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
