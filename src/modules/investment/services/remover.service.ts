import { Investment } from '../schemas/investment.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class RemoverService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async byId(id: string): Promise<Investment> {
    const criteria = { _id: new ObjectId(id) };
    const investment = await this.investmentRepository.findOne(criteria);

    if (!investment) {
      throw new NotFoundException();
    }

    return this.investmentRepository.softDelete(investment);
  }
}
