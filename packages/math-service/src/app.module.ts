import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import { Module } from '@nestjs/common';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import {
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { ConfigModule } from './config/config.module';
import { MathController } from './math/math.controller';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      instrumentations: [],
      sampler: new TraceIdRatioBasedSampler(0.25),
      serviceName: 'math-service',
      spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
    }),
    ConfigModule,
  ],
  controllers: [MathController],
  providers: [],
})
export class AppModule {}
