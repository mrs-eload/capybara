import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { ApiModule } from './api/api.module';

export default function buildSwaggerDoc(app) {
  const main_apidoc = new DocumentBuilder()
    .setTitle('Capybara API')
    .setDescription('API for Capybara')
    .setVersion('1.0')
    .build();

  const customOptions: SwaggerCustomOptions = {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'list',
      operationsSorter: 'alpha',
      tagsSorter: 'alpha',
      filter: true,
      syntaxHighlight: {
        activate: true,
        theme: 'monokai',
      },
    },
    customSiteTitle: 'Capybara API',
  };

  const document = SwaggerModule.createDocument(app, main_apidoc, {
    include: [ApiModule],
    deepScanRoutes: true,
  });

  SwaggerModule.setup('api/docs', app, document, customOptions);

  return app;
}
