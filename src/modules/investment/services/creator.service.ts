import { BadRequestException, Injectable } from '@nestjs/common';
import { Investment } from '../schemas/investment.schema';
import { CreateInvestmentDto } from '../dtos';
import { InvestmentRepository } from '../repositories/investment.repository';
import { DateTime } from 'luxon';

@Injectable()
export class CreatorService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async create(dto: CreateInvestmentDto): Promise<Investment> {
    const beginDate = DateTime.fromISO(dto.investmentDate);
    const endDate = DateTime.fromISO(dto.currentDate);

    if (beginDate > endDate) throw new BadRequestException();

    return this.investmentRepository.createAsync({ ...dto });
  }
}
