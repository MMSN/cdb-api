import { Injectable } from '@nestjs/common';
import { Historical } from '../schemas/historical.schema';
import { CreateCDIEntryDto } from '../dto/create-cdi-entry.dto';
import { HistoricalRepository } from '../repositories/historical.repository';

@Injectable()
export class CreatorService {
  constructor(private readonly investmentRepository: HistoricalRepository) {}

  async create(dto: CreateCDIEntryDto): Promise<Historical> {
    return this.investmentRepository.createAsync({ ...dto });
  }
}
