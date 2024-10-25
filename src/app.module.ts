import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { GoogleSheetsService } from './services/google.sheets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleSheets } from './google.sheets.entity';
import { SheetsService } from './services/sheets.service';
import { SheetController } from './controllers/sheets.controller';
import { SheetsGateways } from './sheet/sheets.gateways';
import { SheetConnectService } from './services/sheet.connect.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleSheets]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'idalko',
      password: 'idalko',
      database: 'jcloudnode',
      entities: [GoogleSheets],
      synchronize: true,
    }),
  ],
  controllers: [WebhookController, SheetController],
  providers: [GoogleSheetsService, SheetsService, SheetConnectService, SheetsGateways],
})
export class AppModule {
}
