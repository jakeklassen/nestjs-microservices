import { Module } from '@nestjs/common';
import { OpenTelemetryModule } from '@metinseylan/nestjs-opentelemetry';
import {
  SimpleSpanProcessor,
  TraceIdRatioBasedSampler,
} from '@opentelemetry/sdk-trace-base';
import { JaegerExporter } from '@opentelemetry/exporter-jaeger';
import { MathController } from './math/math.controller';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      instrumentations: [],
      sampler: new TraceIdRatioBasedSampler(0.25),
      serviceName: 'math-service',
      spanProcessor: new SimpleSpanProcessor(new JaegerExporter()),
    }),
  ],
  controllers: [MathController],
  providers: [],
})
export class AppModule {}
