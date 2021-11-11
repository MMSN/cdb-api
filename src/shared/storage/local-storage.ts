import { Logger } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { StorageInterface } from './storage.interface';

const BASE_FOLDER = 'storage';

class LocalStorage implements StorageInterface {
  loggerService = new Logger('LocalStorage');

  public async download(fileName: string, folder: string): Promise<Buffer> {
    try {
      return readFileSync(`${BASE_FOLDER}/${folder}/${fileName}`);
    } catch (e) {
      this.loggerService.error(
        'Unable to retrieve file from local storage. Error ',
        e,
      );
    }
  }

  public async upload(
    fileName: string,
    content: Buffer,
    folder: string,
  ): Promise<void> {
    const filePath = `${BASE_FOLDER}/${folder}/${fileName}`;
    const directoryPath = filePath.split('/').slice(0, -1).join('/');

    try {
      if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
      }

      writeFileSync(filePath, content);
    } catch (e) {
      console.log('Unable to save file to local storage. Error ', e);
      throw e;
    }
  }
}

export default LocalStorage;
