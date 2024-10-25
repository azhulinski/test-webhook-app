import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { google } from 'googleapis';

@Injectable()
export class SheetConnectService implements OnModuleInit {

  private auth: any;
  private drive: any;
  private logger: Logger = new Logger('ChatGateway');

  constructor() {
    this.auth = new google.auth.GoogleAuth({
        keyFile: '/Users/zhulinski/IdeaProjects/test-webhook-app/webhook-technical-assignment-cd99c8ab4874.json',
        scopes: ['https://www.googleapis.com/auth/drive.file',
          'https://www.googleapis.com/auth/userinfo.email',
        ],
      },
    );
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async onModuleInit() {
    const pageToken = await this.fetchStartPageToken();
    const path_parameters = {
      fileId: '1yeEzO7Nmu2Ol8CdhGDkDLUsHF2vkwS6GyzzAGdYZrh0',
      pageToken,
      requestBody: {
        id: uuidv4(),
        type: 'web_hook',
        address: 'https://33147734ebd7.ngrok.app/webhook',
        payload: true,
        pageToken,
      },
    };
    try {
      const result = await this.drive.changes.watch(path_parameters, {
        rootUrl: 'https://www.googleapis.com',
      });
      this.logger.log('Watch established:', result, result.data);
    } catch (error) {
      this.logger.error('Error setting up watch:', error);
      throw error;
    }
  }

  async fetchStartPageToken() {
    const auth = new google.auth.GoogleAuth({
      keyFile: '/Users/zhulinski/IdeaProjects/test-webhook-app/webhook-technical-assignment-cd99c8ab4874.json',
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    const service = google.drive({ version: 'v3', auth });
    try {
      const res = await service.changes.getStartPageToken({});
      return res.data.startPageToken;
    } catch (err) {
      console.error('Error fetch Start Page Token:', err);
      throw err;
    }
  }

}