import * as fs from 'fs';
import * as path from 'path';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import {
  ConsoleLogger,
  INestApplication,
  NestApplicationOptions,
  ValidationPipe,
} from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from '../config/configuration';
import { secureHeaders } from './middleware/server_info.security.middleware';
import buildSwaggerDoc from './swagger';

export async function bootstrap(
  // TODO fix type overlap between in memory app module and app module
  appModule: unknown,
): Promise<void> {
  const logger = new ConsoleLogger('System logger');

  const appOptions: NestApplicationOptions = {
    bodyParser: true,
  };

  appOptions.httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, './cert/ses-server.key')),
    cert: fs.readFileSync(path.join(__dirname, './cert/ses-server.crt')),
  };
  let app = await NestFactory.create<NestExpressApplication>(
    appModule,
    appOptions,
  );

  try {
    app = configureApplication(app);
    buildSwaggerDoc(app);
    await app.listen(3000);
  } catch (e) {
    logger.error(e.message);
    await app.close();
  }
}

function configureApplication(
  app: NestExpressApplication,
): NestExpressApplication {
  app.enableShutdownHooks();

  // Upper limit for ouputs received for microservices events
  app.use(bodyParser.json({ limit: '2mb' }));
  app.use(cookieParser());
  app.use(
    bodyParser.urlencoded({
      limit: '2mb',
      extended: true,
      parameterLimit: 50000,
    }),
  );

  //Don't give out server identity
  app.disable('x-powered-by');

  app.enableCors({
    // CORS options
    origin: true,
    credentials: true,
  });
  // Add helmet basic security
  app.use(helmet());

  // Secure headers
  app.use(secureHeaders);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  return app;
}
