import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { HistoricalController } from './historical.controller';
import { Historical } from './schemas/historical.schema';
import { ReaderService } from './services/reader.service';

@Module({
  imports: [MikroOrmModule.forFeature([Historical])],
  controllers: [HistoricalController],
  providers: [ReaderService],
})
export class HistoricalModule {}
