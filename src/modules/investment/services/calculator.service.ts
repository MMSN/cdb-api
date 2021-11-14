import { Injectable } from '@nestjs/common';
import { Investment } from '../schemas/investment.schema';
import { DateTime, Interval } from 'luxon';
import { days } from 'src/shared/helpers/date.helper';
import { FinderHistorycalService } from '../../historical/services/finder.service';
import { CalculatedInvestmentInterface } from '../contracts/calculated-investment.interface';

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
    const cdbtax = investment.cdbRate;
    let CumulativeTCDI = 0;
    const historicCDIk: number[] = [];
    const resultInvestment: CalculatedInvestmentInterface[] = [];

    const daysInterval = this.getDateFromInterval(interval);
    for (let i = 0; i < daysInterval.length; i++) {
      const auxDate = `${daysInterval[i].year}-${daysInterval[i].month}-${daysInterval[i].day}`;
      let findOne;
      try {
        findOne = await this.finderHistorycalService.byEntryDate(auxDate);
      } catch (e) {
        console.log('Not found: ', auxDate);
      }
      if (!findOne) continue;
      const cdik = Number(this.getTCDIK(findOne.tax).toFixed(8));
      CumulativeTCDI = Number(this.getCumulativeTCDI(cdik, cdbtax).toFixed(16));
      resultInvestment.push({
        date: auxDate,
        unitPrice: (CumulativeTCDI +
          historicCDIk.reduce((a, b) => a + b, 0)) as number,
      });
      historicCDIk.push(Number((CumulativeTCDI - 1).toFixed(16)));
    }
    return resultInvestment;
  }

  private getDateFromInterval(interval: Interval): DateTime[] {
    return [...days(interval)];
  }

  private getTCDIK(cdik: number): number {
    return (cdik / 100 + 1) ** (1 / 252) - 1;
  }

  private getCumulativeTCDI(tcdik: number, tcdb: number): number {
    return 1 + tcdik * (tcdb / 100);
  }
}
