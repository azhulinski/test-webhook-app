import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscriber } from '../entities/subscriber.entity';

export class SubscribersService {
  constructor(@InjectRepository(Subscriber) private repository: Repository<Subscriber>) {
  }

  addSubscriber(body: Subscriber) {
    return this.repository.save(body);
  }

}