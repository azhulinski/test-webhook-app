import { Module } from '@nestjs/common';
import { WebhookController } from './controllers/webhook.controller';
import { GoogleSheetsService } from './services/google.sheets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleSheets } from './entities/google.sheets.entity';
import { SheetsService } from './services/sheets.service';
import { SheetController } from './controllers/sheets.controller';
import { SheetsGateways } from './sheet/sheets.gateways';
import { configService } from './services/config.service';
import { SubscribersController } from './controllers/subscribers.controller';
import { SubscribersService } from './services/subscribers.service';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GoogleSheets, Subscriber]),
    TypeOrmModule.forRoot(configService.getTypeOrmConfig(),
    ),
  ],
  controllers: [WebhookController, SheetController, SubscribersController],
  providers: [GoogleSheetsService, SheetsService, SubscribersService, SheetsGateways],
})
export class AppModule {
}
