// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UserRepository } from '../users/users.repository';

import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './auth.dto';
import { Unauthenticated } from 'src/decorators/auth.decorator';
import { User } from '@prisma/client';
@Controller('auth')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Unauthenticated()
  async login(
    @Body() data: LoginDto,
    @Res({ passthrough: true }) response,
  ): Promise<User> {
    const user = await this.userRepository.findActiveByUsername(data.username);
    if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        // One hour from login
        iat: (new Date().getTime() + 30 * 60 * 1000) / 1000,
      },
      this.configService.get('JWT_SECRET'),
    );
    response.setHeader('x-access-token', token);

    return user;
  }
}
