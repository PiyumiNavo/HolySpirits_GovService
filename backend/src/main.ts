import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ResponseTransformerInterceptor } from './common/interceptors/response-transformer.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Get CORS origins from environment variable or use defaults
  const corsOrigins = process.env.CORS_ORIGINS 
    ? process.env.CORS_ORIGINS.split(',').map(origin => origin.trim())
    : [
        'http://localhost:3001', // Citizen app
        'http://localhost:3002', // Department app  
        'http://localhost:3003', // Admin app
        'http://127.0.0.1:3001', // Citizen app (alternative localhost)
        'http://127.0.0.1:3002', // Department app (alternative localhost)
        'http://127.0.0.1:3003', // Admin app (alternative localhost)
      ];

  // Enable CORS with specific origins for frontend apps
  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type', 
      'Authorization', 
      'Accept', 
      'Origin', 
      'X-Requested-With',
    ],
    credentials: true,
    optionsSuccessStatus: 200, // For legacy browser support
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Apply global response transformer
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());

  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Government Services API')
    .setDescription('API for booking and managing government services')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('debugger', app, document);

  await app.listen(3000);
}
bootstrap().catch((err) => {
  console.error('Error starting server:', err);
  process.exit(1);
});
