import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import WinstonCloudwatch from 'winston-cloudwatch';
import * as Transport from 'winston-transport';
import { EnvironmentEnum } from '../enums/environment.enum';

@Injectable()
export class WinstonConfigService implements WinstonModuleOptionsFactory {
  constructor(private configService: ConfigService) {}

  async createWinstonModuleOptions(): Promise<WinstonModuleOptions> {
    const { PRODUCTION, SANDBOX, STAGING } = EnvironmentEnum;
    const level = this.configService.get<string>('LOG_LEVEL', 'debug');
    const nodeEnv = this.configService.get<EnvironmentEnum>('NODE_ENV');
    const appName = this.configService.get<string>('npm_package_name');
    const logGroup = `housi/microservices/${nodeEnv}`;

    const transports: Transport[] = [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          nestWinstonModuleUtilities.format.nestLike(),
        ),
      }),
    ];

    if ([PRODUCTION, SANDBOX, STAGING].includes(nodeEnv)) {
      transports.push(
        new WinstonCloudwatch({
          jsonMessage: true,
          awsAccessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
          awsSecretKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
          awsRegion: this.configService.get<string>('AWS_REGION', 'us-east-1'),
          logGroupName: this.configService.get<string>('LOG_GROUP', logGroup),
          logStreamName: this.configService.get<string>(
            'LOG_STREAM_NAME',
            appName,
          ),
        }),
      );
    }

    return { level, transports };
  }
}
