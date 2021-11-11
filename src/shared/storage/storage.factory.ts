import S3Storage from './s3-storage';
import LocalStorage from './local-storage';
import { StorageInterface } from './storage.interface';

class StorageFactory {
  public static make(serviceName?: string): StorageInterface {
    switch (serviceName) {
      case 's3':
        return new S3Storage();
      case 'local':
        return new LocalStorage();
      default:
        return new LocalStorage();
    }
  }
}

export default StorageFactory;
