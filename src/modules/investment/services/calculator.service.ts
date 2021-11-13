import { Injectable } from '@nestjs/common';
import { Investment } from '../schemas/investment.schema';
import { DateTime, Interval } from 'luxon';
import { days } from 'src/shared/helpers/date.helper';
import { FinderHistorycalService } from '../../historical/services/finder.service';

@Injectable()
export class CalculatorService {
  constructor(
    private readonly finderHistorycalService: FinderHistorycalService,
  ) {}

  async calculate(investment: Investment): Promise<any> {
    const interval = Interval.fromDateTimes(
      DateTime.fromISO(investment.investmentDate),
      DateTime.fromISO(investment.currentDate),
    );

    const aux = [...days(interval)];
    const auxDate = `${aux[0].year}-${aux[0].month}-${aux[0].day}`;
    const findOne = await this.finderHistorycalService.byEntryDate(auxDate);
    console.log(findOne);
  }
}
