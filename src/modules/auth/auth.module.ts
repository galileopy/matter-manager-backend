import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { UserModule } from '../users/users.module';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [ConfigService],
})
export class AuthModule {}
