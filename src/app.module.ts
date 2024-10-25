import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { GoogleSheetsService } from './services/google.sheets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleSheets } from './google.sheets.entity';
import { SheetsService } from './services/sheets.service';
import { SheetController } from './controllers/sheets.controller';
import { SheetsGateways } from './sheet/sheets.gateways';
import { SheetConnectService } from './services/sheet.connect.service';
import { configService } from './services/config.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleSheets]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig(),
    ),
  ],
  controllers: [WebhookController, SheetController],
  providers: [GoogleSheetsService, SheetsService, SheetConnectService, SheetsGateways],
})
export class AppModule {
}
