import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentVariables } from 'src/config/config';
import { Calculation } from './calculation.entity';
import { MathController } from './math.controller';
import { MathService } from './math.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculation]),
    ClientsModule.registerAsync([
      {
        name: 'MATH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService<EnvironmentVariables>) => {
          return {
            name: configService.get<string>('MATH_SERVICE_NAME'),
            transport: Transport.RMQ,
            options: {
              urls: [configService.get<string>('MATH_SERVICE_URL')],
              queue: configService.get<string>('MATH_SERVICE_QUEUE_NAME'),
              queueOptions: {
                durable: false,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MathController],
  providers: [MathService],
})
export class MathModule {}
