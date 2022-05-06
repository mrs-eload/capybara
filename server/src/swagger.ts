import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

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
    customSiteTitle: '3decision API',
  };

  const document = SwaggerModule.createDocument(app, main_apidoc, {});

  SwaggerModule.setup('api/docs', app, document, customOptions);

  return app;
}
