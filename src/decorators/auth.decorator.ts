import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';

export const Roles = Reflector.createDecorator<Role[]>();
export const Unauthenticated = Reflector.createDecorator<boolean>({
  transform: () => true,
});
