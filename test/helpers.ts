import * as Casual from 'casual';
import { CreateInvestmentDto } from 'src/modules/investment/dtos';

export function givenInvestmentWrong(
  partial?: Partial<CreateInvestmentDto>,
): CreateInvestmentDto {
  return {
    investmentDate: Casual._name(),
    cdbRate: Casual._name() as any,
    currentDate: Casual._name(),
    ...partial,
  };
}

export function givenInvestmentRight(): CreateInvestmentDto {
  return {
    investmentDate: '2016-11-14',
    cdbRate: 103.5,
    currentDate: '2016-12-26',
  };
}

export function givenInvestmentWrongDates(): CreateInvestmentDto {
  return {
    investmentDate: '2016-12-26',
    cdbRate: 103.5,
    currentDate: '2016-11-14',
  };
}
