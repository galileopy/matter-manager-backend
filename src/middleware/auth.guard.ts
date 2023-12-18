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
    // ------------------- SKIP ------------------------ //
    const isUnauthenticated = this.reflector.get(
      Unauthenticated,
      context.getHandler(),
    );

    if (isUnauthenticated) return true;

    // --------------------  Extract Token -------------------------- //

    let request, response, token;

    try {
      request = context.switchToHttp().getRequest();
      response = context.switchToHttp().getResponse();

      token = this.extractTokenFromHeader(request);
      if (!token) throw Error();

      const userData = (await jwt.decode(
        token,
        this.configService.get('JWT_SECRET'),
      )) as any;

      if (!userData) throw Error();

      if (global['deleted_users'].has(userData.id)) {
        global['deleted_users'].delete(userData.id);
        throw new UnauthorizedException();
      }

      request['user'] = userData;
    } catch (e) {
      throw new UnauthorizedException();
    }

    // -------------------- Expired token --------------------------
    if (request['user'].iat < new Date().getTime() / 1000) {
      throw new jwt.TokenExpiredError('token has expired', new Date());
    }

    // --------------  Authorization -------------------- //
    const roles = this.reflector.get(Roles, context.getHandler());

    if (roles && !roles.includes(request['user'].role)) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    // ------------------ REFRESH TOKEN ------------------------ //
    const refreshToken = jwt.sign(
      {
        ...request['user'],
        iat: (new Date().getTime() + 60 * 60 * 1000) / 1000,
      },
      this.configService.get('JWT_SECRET'),
    );

    response.setHeader('x-access-token', refreshToken);
    return true;
  }
}
