import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CatchEverythingFilter } from './exceptions/exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

const options = {
  transform: true,
  stopAtFirstError: true
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe(options));
  const httpAdapterHost = app.get(HttpAdapterHost)
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost))
  await app.listen(process.env.PORT ?? 9000);
}
bootstrap();