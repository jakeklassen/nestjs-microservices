import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import {
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { EnvironmentVariables } from './config/config';
import { Calculation } from './math/calculation.entity';
import { MathModule } from './math/math.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenTelemetryModule.forRoot({
      instrumentations: [],
      sampler: new TraceIdRatioBasedSampler(0.25),
      serviceName: 'web-service',
      spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService<EnvironmentVariables>) => {
        return {
          type: configService.get<string>('DB_TYPE') as any,
          host: configService.get<string>('DB_HOST'),
          port: configService.get<number>('DB_PORT'),
          username: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_DATABASE'),
          entities: [Calculation],
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    MathModule,
  ],
  providers: [],
})
export class AppModule {}
