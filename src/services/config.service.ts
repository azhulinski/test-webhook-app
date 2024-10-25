import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { GoogleSheets } from '../google.sheets.entity';

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
      host: this.getValue('POSTGRES_HOST'),
      port: parseInt(this.getValue('POSTGRES_PORT')),
      username: this.getValue('POSTGRES_USER'),
      password: this.getValue('POSTGRES_PASSWORD'),
      database: this.getValue('POSTGRES_DATABASE'),
      entities: [GoogleSheets],
      synchronize: true,
    };
  }

  public getEmailConfig() {
    return {
      host: this.getValue('EMAIL_HOST'),
      port: this.getValue('EMAIL_PORT'),
      secure: true,
      auth: {
        user: this.getValue('EMAIL_ADDRESS'),
        pass: this.getValue('EMAIL_SECRET'),
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