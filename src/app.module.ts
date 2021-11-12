import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthModule } from './modules/health/health.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './shared/services/mikro-orm-config.service';
import { InvestmentModule } from './modules/investment/investment.module';
import { HistoricalModule } from './modules/historical/historical.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MikroOrmConfigService,
    }),
    HealthModule,
    InvestmentModule,
    HistoricalModule,
  ],
  providers: [Logger],
})
export class AppModule {}
