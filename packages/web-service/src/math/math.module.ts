import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calculation } from './calculation.entity';
import { MathController } from './math.controller';
import { MathService } from './math.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculation]),
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'math_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}
