import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, User } from '@prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  findActiveUserByUsername(username: string): Promise<User> {
    return this.prismaClient.user.findFirst({
      where: { username, deletedAt: null },
    });
  }

  findAllUsers(): Promise<User[]> {
    return this.prismaClient.user.findMany();
  }

  createUser(userData: Prisma.UserCreateInput): Promise<User> {
    return this.prismaClient.user.create({ data: userData });
  }

  updateUser(userId: string, userData: Prisma.UserUpdateInput): Promise<User> {
    return this.prismaClient.user.update({
      where: { id: userId },
      data: userData,
    });
  }

  deleteUser(userId: string): Promise<User> {
    return this.prismaClient.user.update({
      where: { id: userId, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  }
}
