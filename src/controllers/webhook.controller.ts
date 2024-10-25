import { Body, Controller, HttpCode, HttpStatus, Logger, Post } from '@nestjs/common';
import { GoogleSheetsService } from '../services/google.sheets.service';
import { GoogleSheets } from '../google.sheets.entity';
import { Logging } from '../decorators/logging.decorator';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {

  private logger: Logger = new Logger('WebhookController');

  constructor(public googleSheetService: GoogleSheetsService) {
  }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully written to DB table.'})
  @ApiBody({type: GoogleSheets})
  @ApiOperation({summary: 'receives data from Google Sheet with the changes made by the user'})
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Logging()
  handleWebhook(@Body() body: GoogleSheets): Promise<GoogleSheets> {
    if (Object.keys(body).length !== 0) {
      this.logger.log('Webhook received:', JSON.stringify(body, null, 2));
      return this.googleSheetService.create(JSON.parse(Object.keys(body)[0]))
    }
  }
}
