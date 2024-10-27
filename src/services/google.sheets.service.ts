import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoogleSheets } from '../entities/google.sheets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsGateways } from '../sheet/sheets.gateways';
import { configService } from './config.service';
import { Subscriber } from '../entities/subscriber.entity';

@Injectable()
export class GoogleSheetsService {
  private logger: Logger = new Logger('WebhookController');

  constructor(@InjectRepository(GoogleSheets) private sheetsRepository: Repository<GoogleSheets>,
              @InjectRepository(Subscriber) private subscriberRepository: Repository<Subscriber>,
              private gateWay: SheetsGateways) {
  }

  async create(content: GoogleSheets) {
    const sheet = this.sheetsRepository.create(content);
    const count = await this.sheetsRepository.count();
    if (count % 10 === 0) {
      try {
        this.sendMails();
      } catch (error) {
        console.log(error);
      }
    }
    this.gateWay.handleMessage(JSON.stringify(sheet));
    return this.sheetsRepository.save(sheet);
  }

  async sendMails() {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(configService.getEmailConfig());
    const emails = await this.subscriberRepository
      .createQueryBuilder()
      .select(['subscriber'])
      .distinct()
      .execute();
    if (!emails.length) {
      this.logger.error('No emails found');
      return;
    }
    const recipients: string[] = emails.map(subscriber => {
      return subscriber.subscriber;
    });
    if (!recipients.length) {
      this.logger.error('No emails found');
      return;
    }
    const body: GoogleSheets[] = await this.sheetsRepository.find();
    transporter.sendMail({
      from: 'a.zhulinski@ukr.net',
      to: recipients,
      subject: 'Google Sheet subscription',
      text: JSON.stringify(body),
    }).then(() => {
      this.logger.log('email with last 10 row has been successfully sent to subscribers');
    });
  }
}
