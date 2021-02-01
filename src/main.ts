import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {NestApplicationOptions, ValidationPipe} from "@nestjs/common";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as compression from 'compression';
import {WinstonModule} from 'nest-winston';
import * as winston from 'winston';

const options: NestApplicationOptions = {

}
if (process.env.ENVIRONMENT !== 'development') {
  options.logger = WinstonModule.createLogger({
    format: winston.format.combine(winston.format.timestamp({format: 'DD-MM-YY HH:mm:ss'}), winston.format.json()),
    transports: [
      new winston.transports.File({filename: 'error.log', level: 'error'}),
      new winston.transports.File({filename: 'info.log'})
    ]
  })
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, options);
  app.enableCors();
  // app.use(helmet());
  app.use(compression());
  app.use(
      rateLimit({
        windowMs: 60 * 1000, // 1 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      }),
  );

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3005);
}
bootstrap();
