// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';

import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from './auth.dto';

@Controller('auth')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class AuthController {
  constructor(
    private readonly configService: ConfigService,
    private readonly userRepository: UsersRepository,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() data: LoginDto): Promise<string> {
    const user = await this.userRepository.findUserByUsername(data.username);
    if (!user) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    const token = jwt.sign(
      { id: user.id, role: user.role, loggedInAt: new Date() },
      this.configService.get('JWT_SECRET'),
    );

    return token;
  }
}
