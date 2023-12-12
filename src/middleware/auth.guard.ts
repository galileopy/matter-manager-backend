import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
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
