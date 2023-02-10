import { Provider } from '@nestjs/common';
import * as convict from 'convict';
import * as formats from 'convict-format-with-validator';

// Add additional formats
convict.addFormat(formats.email);
convict.addFormat(formats.url);
convict.addFormat(formats.ipaddress);

export interface AppConfig {
  amqp: {
    url: string;
  };
  queues: {
    math: {
      name: string;
    };
  };
}

export const config = convict<AppConfig>({
  amqp: {
    url: {
      doc: 'AMQP URL',
      format: String,
      default: 'amqp://localhost:5672',
      env: 'AMQP_URL',
    },
  },
  queues: {
    math: {
      name: {
        doc: 'Math queue name',
        format: String,
        default: 'math_queue',
        env: 'MATH_QUEUE_NAME',
      },
    },
  },
});

// Load environment dependent configuration
// const env = config.get('env');
// config.loadFile(path.resolve(__dirname, `${env}.json`));

// Perform validation
config.validate({ allowed: 'strict' });

export const ConfigToken = Symbol('Config');

export type Config = typeof config;

export const configProvider: Provider = {
  provide: ConfigToken,
  useValue: config,
};
