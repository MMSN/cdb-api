import { Repository } from '@mikro-orm/core';
import { CustomRepository } from '../../../shared/contracts/custom.repository';
import { Investment } from '../schemas/investment.schema';

@Repository(Investment)
export class InvestmentRepository extends CustomRepository<Investment> {}
