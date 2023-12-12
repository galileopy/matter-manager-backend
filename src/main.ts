import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthGuard } from './middleware/auth.guard';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalGuards(
    new AuthGuard(app.get(ConfigService), app.get(Reflector)),
  );
  await app.listen(3000);
}
bootstrap();
