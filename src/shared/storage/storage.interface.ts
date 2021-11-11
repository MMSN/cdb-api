export interface StorageInterface {
  download(fileName: string, folder: string): Promise<Buffer>;
  upload(fileName: string, content: Buffer, folder: string): Promise<void>;
}
