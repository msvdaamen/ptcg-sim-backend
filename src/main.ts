import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {NestApplicationOptions, ValidationPipe} from "@nestjs/common";
import * as compression from 'compression';
import {WinstonModule} from 'nest-winston';
import * as winston from 'winston';
import {NestExpressApplication} from "@nestjs/platform-express";

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
  const app = await NestFactory.create<NestExpressApplication>(AppModule, options);
  app.enableCors();
  // app.use(helmet());
  app.use(compression());
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3005);
}
bootstrap();
