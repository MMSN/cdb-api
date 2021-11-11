import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from 'nest-winston';
import { HealthModule } from './modules/health/health.module';
import { WinstonConfigService } from './shared/services/winston-config.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MikroOrmConfigService } from './shared/services/mikro-orm-config.service';
import { InvestmentModule } from './modules/investment/investment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: WinstonConfigService,
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useClass: MikroOrmConfigService,
    }),
    HealthModule,
    InvestmentModule,
  ],
  providers: [Logger],
})
export class AppModule {}
