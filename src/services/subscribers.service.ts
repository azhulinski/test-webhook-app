import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';
import * as process from 'node:process';

export class SubscribersService {
  constructor(@InjectRepository(Subscriber) private repository: Repository<Subscriber>) {
  }

  addSubscriber(body: Subscriber) {
    console.log(process.env.EMAIL_ADDRESS);
    return this.repository.save(body);
  }

}