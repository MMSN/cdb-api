import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { InvestmentController } from './investment.controller';
import { Investment } from './schemas/investment.schema';
import {
  IndexerService,
  CreatorService,
  UpdaterService,
  FinderService,
  RemoverService,
  CalculatorService,
  ChartService,
} from './services';
import { Historical } from '../historical/schemas/historical.schema';
import { FinderHistorycalService } from '../historical/services/finder.service';

@Module({
  imports: [MikroOrmModule.forFeature([Investment, Historical])],
  controllers: [InvestmentController],
  providers: [
    IndexerService,
    CreatorService,
    UpdaterService,
    FinderService,
    RemoverService,
    CalculatorService,
    FinderHistorycalService,
    ChartService,
  ],
})
export class InvestmentModule {}
