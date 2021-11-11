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
} from './services';

@Module({
  imports: [MikroOrmModule.forFeature([Investment])],
  controllers: [InvestmentController],
  providers: [
    IndexerService,
    CreatorService,
    UpdaterService,
    FinderService,
    RemoverService,
  ],
})
export class InvestmentModule {}
