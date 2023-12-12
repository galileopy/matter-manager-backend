import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { Roles, Unauthenticated } from 'src/decorators/auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private reflector: Reflector,
  ) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isUnauthenticated = this.reflector.get(
      Unauthenticated,
      context.getHandler(),
    );

    if (isUnauthenticated) return true;

    const roles = this.reflector.get(Roles, context.getHandler());

    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();

    try {
      request['user'] = await jwt.decode(
        token,
        this.configService.get('JWT_SECRET'),
      );

      if (request['user'].iat < new Date().getTime() / 1000) throw Error();
    } catch (e) {
      throw new UnauthorizedException();
    }

    if (roles && !roles.includes(request['user'].role)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // ------------------ REFRESH TOKEN ------------------------
    const refreshToken = jwt.sign(
      {
        ...request['user'],
        iat: (new Date().getTime() + 60 * 60 * 1000) / 1000,
      },
      this.configService.get('JWT_SECRET'),
    );

    response.setHeader('refresh-token', refreshToken);
    return true;
  }
}
