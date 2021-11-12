import { Injectable, NotFoundException } from '@nestjs/common';
import { Investment } from '../schemas/investment.schema';
import { UpdateInvestmentDto } from '../dtos';
import { ObjectId } from '@mikro-orm/mongodb';
import { wrap } from '@mikro-orm/core';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class UpdaterService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async update(id: string, dto: UpdateInvestmentDto): Promise<Investment> {
    const investment = await this.investmentRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!investment) {
      throw new NotFoundException();
    }

    wrap(investment).assign(dto);
    await this.investmentRepository.flush();
    return investment;
  }
}
