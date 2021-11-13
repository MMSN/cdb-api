import { Historical } from '../schemas/historical.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { HistoricalRepository } from '../repositories/historical.repository';

@Injectable()
export class FinderHistorycalService {
  constructor(private readonly historicalRepository: HistoricalRepository) {}

  async byId(id: string): Promise<Historical> {
    const entry = await this.historicalRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!entry) {
      throw new NotFoundException();
    }

    return entry;
  }

  async byEntryDate(date: string): Promise<Historical> {
    const entry = await this.historicalRepository.findOne({
      entryDate: date,
    });

    if (!entry) {
      throw new NotFoundException();
    }

    return entry;
  }
}
