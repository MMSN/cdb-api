import { Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { StorageInterface } from './storage.interface';

class S3Storage implements StorageInterface {
  private s3: S3;
  loggerService = new Logger('s3Storage');

  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  public async download(fileName: string, folder: string): Promise<Buffer> {
    try {
      const file = await this.s3
        .getObject({ Bucket: folder, Key: fileName })
        .promise();

      return Buffer.from(file.Body as Buffer);
    } catch (e) {
      this.loggerService.error(
        'Unable to retrieve file from AWS S3 storage. Error ',
        e,
      );
      throw e;
    }
  }

  public async upload(
    fileName: string,
    content: Buffer,
    folder: string,
  ): Promise<void> {
    try {
      await this.s3
        .upload({ Bucket: folder, Key: fileName, Body: content })
        .promise();
    } catch (e) {
      console.log('Unable to upload file to AWS S3 storage. Error ', e);
      throw e;
    }
  }
}

export default S3Storage;
