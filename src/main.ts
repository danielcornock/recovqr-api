import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import { ConfigService } from './core/services/config/config.service';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin: ['http://localhost:4500', 'https://https://recovqr.netlify.app']
  });
  app.use(helmet());
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150
  }));
  
  const port = ConfigService.getPort();
  await app.listen(port);
  Logger.log(`Server listening on port ${port}`, 'NestApplication');
}
bootstrap();
