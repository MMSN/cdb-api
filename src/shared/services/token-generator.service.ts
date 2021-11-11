import { randomBytes } from 'crypto';
import { Logger } from '@nestjs/common';
import { StorageInterface } from '../storage/storage.interface';
import StorageFactory from '../storage/storage.factory';
import { EnvironmentEnum } from '../enums/environment.enum';
import TokenModel from '../models/token.model';

class TokenGeneratorService {
  private storage: StorageInterface;
  loggerService = new Logger('TokenGeneratorService');

  constructor() {
    this.storage = StorageFactory.make(process.env.STORAGE_SERVICE);
  }

  async generate(
    appName: string,
    environment: EnvironmentEnum,
  ): Promise<string> {
    try {
      const hash = randomBytes(20).toString('hex');
      const token = JSON.stringify(new TokenModel(appName, hash));
      const folder = `${process.env.npm_package_name}-tokens-${environment}`;

      await this.storage.upload(hash, Buffer.from(token), folder);

      this.loggerService.debug(
        `Token successfully generated for ${appName}: ${hash}`,
      );
      return hash;
    } catch (e) {
      this.loggerService.error('Failed to generated token. Error: ', e);
      throw e;
    }
  }
}

export default TokenGeneratorService;
