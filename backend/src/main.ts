import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const appConfig = configService.get('app') as { port: number; environment: string };
  const port = appConfig?.port ?? 3000;

  await app.listen(port);
  console.log(`ARTIQ backend running on port ${port} [${appConfig?.environment ?? 'development'}]`);
}

bootstrap();
