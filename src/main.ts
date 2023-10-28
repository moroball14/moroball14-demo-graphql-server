import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // localhost:3001からのアクセスを許可する
  app.enableCors({
    origin: 'http://localhost:3001',
  });
  await app.listen(3000);
}
bootstrap();
