import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HistoricalController } from './historical.controller';

@Module({
  imports: [MikroOrmModule.forFeature([])],
  controllers: [HistoricalController],
  providers: [],
})
export class HistoricalModule {}
