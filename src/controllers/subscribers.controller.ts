import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logging } from '../decorators/logging.decorator';
import { Subscriber } from '../entities/subscriber.entity';
import { SubscribersService } from '../services/subscribers.service';

@Controller('subscribers')
export class SubscribersController {

  constructor(public subscriberService: SubscribersService) {}

@ApiResponse({
  status: 201,
  description: 'Subscriber has been successfully written to DB table.'})
@ApiBody({type: Subscriber})
@ApiOperation({summary: 'adds a Google Sheet subscriber'})
@Post()
@HttpCode(HttpStatus.CREATED)
@Logging()
  addSubscriber(@Body() body: Subscriber) {
  return this.subscriberService.addSubscriber(body);
}

}