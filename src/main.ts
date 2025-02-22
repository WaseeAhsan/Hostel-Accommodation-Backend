import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Enable CORS (Cross-Origin Resource Sharing) to allow your frontend to connect
  app.enableCors({
    origin: 'http://localhost:3001',  // Frontend URL (modify if different)
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });

  await app.listen(3000);
  console.log('Server is running on http://localhost:3000');
}
bootstrap();
