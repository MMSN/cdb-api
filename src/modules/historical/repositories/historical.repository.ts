import { Repository } from '@mikro-orm/core';
import { CustomRepository } from '../../../shared/contracts/custom.repository';
import { Historical } from '../schemas/historical.schema';

@Repository(Historical)
export class HistoricalRepository extends CustomRepository<Historical> {}
