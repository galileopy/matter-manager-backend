import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findUserByUsername(username: string): Promise<User> {
    return this.prismaClient.user.findUnique({ where: { username } });
  }

  findAllUsers(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }
}
