import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleSheets } from '../entities/google.sheets.entity';
import { Subscriber } from '../entities/subscriber.entity';
import * as process from 'node:process';

require('dotenv').config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) {
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: process.env.POSTGRES_HOST || this.getValue('POSTGRES_HOST'),
      port: parseInt(process.env.POSTGRES_PORT || this.getValue('POSTGRES_PORT')),
      username: process.env.POSTGRES_USER || this.getValue('POSTGRES_USER'),
      password: process.env.POSTGRES_PASSWORD || this.getValue('POSTGRES_PASSWORD'),
      database: process.env.POSTGRES_DATABASE || this.getValue('POSTGRES_DATABASE'),
      entities: [GoogleSheets, Subscriber],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    };
  }

  public getEmailConfig() {
    return {
      host: process.env.EMAIL_HOST || this.getValue('EMAIL_HOST'),
      port: process.env.EMAIL_PORT || this.getValue('EMAIL_PORT'),
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS || this.getValue('EMAIL_ADDRESS'),
        pass: process.env.EMAIL_ADDRESS || this.getValue('EMAIL_SECRET'),
      },
    };
  }

}

const configService = new ConfigService(process.env)
  .ensureValues([
    'POSTGRES_HOST',
    'POSTGRES_PORT',
    'POSTGRES_USER',
    'POSTGRES_PASSWORD',
    'POSTGRES_DATABASE',
  ]);

export { configService };