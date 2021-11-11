import { Factory } from '@mikro-orm/seeder';
import Faker from 'faker';
import { Investment } from '../../src/modules/investment/schemas/investment.schema';

export class ReviewFactory extends Factory<Investment> {
  model = Investment;

  definition(faker: typeof Faker): Partial<Investment> {
    return {
      investmentDate: faker.date.past(10).toISOString(),
      cdbRate: Number(faker.finance.amount(2, 0, 2)),
      currentDate: faker.date.past(1).toISOString(),
    };
  }
}
