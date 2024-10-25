import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GoogleSheets } from '../google.sheets.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SheetsGateways } from '../sheet/sheets.gateways';
import { configService } from './config.service';

@Injectable()
export class GoogleSheetsService {

  constructor(@InjectRepository(GoogleSheets) private repository: Repository<GoogleSheets>, private gateWay: SheetsGateways) {
  }

  async create(content: GoogleSheets) {
    const sheet = this.repository.create(content);
    const count = await this.repository.count();
    if (count % 10 === 0) {
      try {
        this.sendMails();
      } catch (error) {
        console.log(error);
      }
    }

    this.gateWay.handleMessage(JSON.stringify(sheet));
    return this.repository.save(sheet);
  }

  async sendMails() {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport(configService.getEmailConfig());
    const emails = await this.repository
      .createQueryBuilder('google_sheets')
      .select(['email'])
      .distinct()
      .execute();
    const recipients: string[] = emails.map(email => {
      return email.email;
    });
    const body: GoogleSheets[] = await this.repository.find();
    transporter.sendMail({
      from: 'a.zhulinski@ukr.net',
      to: recipients,
      subject: 'Google Sheet subscription',
      text: JSON.stringify(body),
    });
  }
}
