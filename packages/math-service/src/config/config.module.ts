import { Module } from '@nestjs/common';
import { configProvider } from './config.provider';

@Module({
  providers: [configProvider],
})
export class ConfigModule {}
