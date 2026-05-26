import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // CORS — explicit allowlist: never open to wildcard
  const rawOrigins = process.env.CORS_ORIGIN || '';
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && !rawOrigins) {
    logger.error(
      'CORS_ORIGIN is not set in production. ' +
      'All browser requests from the frontend will be blocked. ' +
      'Set CORS_ORIGIN to your Render frontend URL (e.g. https://yourapp.onrender.com).',
    );
  }

  const allowedOrigins = (rawOrigins || 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // cache preflight 24 h
  });

  // Global validation — strip unknown fields, reject bad payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(`Server running on http://localhost:${port}`);
  logger.log(`API available at http://localhost:${port}/api`);
  logger.log(`Allowed origins: ${allowedOrigins.join(', ')}`);
}

bootstrap();
