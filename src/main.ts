import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { getValidationOptions } from './config';
import { authenticationMiddleware } from './shared/middlewares/authentication';

const { npm_package_version } = process.env;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe(getValidationOptions()));

  const config = buildSwaggerConfig();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  if (!process.env.DISABLE_AUTH || process.env.DISABLE_AUTH === 'false') {
    app.use(authenticationMiddleware);
  }
  await app.listen(3000);
}

function buildSwaggerConfig() {
  return new DocumentBuilder()
    .setTitle('Nest Template')
    .setVersion(npm_package_version)
    .addSecurity('token', { type: 'apiKey', name: 'token', in: 'header' })
    .build();
}

bootstrap();
