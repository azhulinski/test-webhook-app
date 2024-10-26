import { InjectRepository } from '@nestjs/typeorm';
import { GoogleSheets } from '../entities/google.sheets.entity';
import { Repository } from 'typeorm';
import {Logging} from '../decorators/logging.decorator';

export class SheetsService {
  constructor(@InjectRepository(GoogleSheets) private repository: Repository<GoogleSheets>) {
  }

  getById(id: number): Promise<GoogleSheets> {
    return this.repository.findOneBy({ id });
  }

  getAll(): Promise<GoogleSheets[]> {
    return this.repository.find();
  }
}