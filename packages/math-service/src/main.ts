import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { config } from './config/config.provider';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [config.get('amqp.url')],
        queue: config.get('queues.math.name'),
        queueOptions: {
          durable: false,
        },
      },
    },
  );

  await app.listen();
}

bootstrap();
