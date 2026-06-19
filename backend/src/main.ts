import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { HttpExceptionFilter }
  from './common/filters/http-exception.filter';


async function bootstrap() {
  const app =
    await NestFactory.create(AppModule);

  app.useGlobalInterceptors(
    new ResponseInterceptor(),
  );

  app.useGlobalFilters(
    new HttpExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
  .setTitle('Group ERP API')
  .setDescription('ERP Backend APIs')
  .setVersion('1.0')
  .build();

const document = SwaggerModule.createDocument(
  app,
  config,
);

SwaggerModule.setup(
  'api',
  app,
  document,
);

  await app.listen(
    process.env.PORT ?? 3000,
  );
}

bootstrap();