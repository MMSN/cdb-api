import { Investment } from '../schemas/investment.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class FinderService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  async byId(id: string): Promise<Investment> {
    const investment = await this.investmentRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!investment) {
      throw new NotFoundException();
    }

    return investment;
  }
}
