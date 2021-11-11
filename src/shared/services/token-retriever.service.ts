import { Logger } from '@nestjs/common';
import StorageFactory from '../storage/storage.factory';
import { StorageInterface } from '../storage/storage.interface';
import TokenModel from '../models/token.model';

class TokenRetrieverService {
  private storage: StorageInterface;
  loggerService = new Logger('TokenRetrieverService');

  constructor() {
    this.storage = StorageFactory.make(process.env.STORAGE_SERVICE);
  }

  public async retrieve(hash: string): Promise<TokenModel> {
    try {
      const folder = `${process.env.npm_package_name}-tokens-${process.env.NODE_ENV}`;
      const object = await this.storage.download(hash, folder);
      const { appName, token } = JSON.parse(object.toString('utf-8'));

      this.loggerService.debug(`Token successfully retrieved for ${appName}`);
      return new TokenModel(appName, token);
    } catch (e) {
      this.loggerService.error('Unable to retrieve token. Error: ', e);
      return e;
    }
  }
}

export default TokenRetrieverService;
