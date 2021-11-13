import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HistoricalController } from './historical.controller';
import { Historical } from './schemas/historical.schema';
import { ReaderService } from './services/reader.service';
import { CreatorService } from './services/creator.service';
import { FinderHistorycalService } from './services/finder.service';

@Module({
  imports: [MikroOrmModule.forFeature([Historical])],
  controllers: [HistoricalController],
  providers: [ReaderService, CreatorService, FinderHistorycalService],
  exports: [FinderHistorycalService],
})
export class HistoricalModule {}
