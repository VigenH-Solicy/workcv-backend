import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join, dirname } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const currentDir = dirname(dirname(__filename));
  app.use('/public', express.static(join(currentDir, 'uploads')));
  await app.listen(process.env.PORT, '0.0.0.0');
}

bootstrap();
