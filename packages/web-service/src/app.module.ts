import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import {
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { Calculation } from './math/calculation.entity';
import { MathModule } from './math/math.module';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      instrumentations: [],
      sampler: new TraceIdRatioBasedSampler(0.25),
      serviceName: 'web-service',
      spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'postgres',
      entities: [Calculation],
      /**
       * If you are using migrations, synchronize should be set to false.
       */
      synchronize: true,
    }),
    MathModule,
  ],
  providers: [],
})
export class AppModule {}
