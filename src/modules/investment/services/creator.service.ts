import { Injectable } from '@nestjs/common';
import { Investment } from '../schemas/investment.schema';
import { CreateInvestmentDto } from '../dtos';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class CreatorService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async create(dto: CreateInvestmentDto): Promise<Investment> {
    return this.investmentRepository.createAsync({ ...dto });
  }
}
