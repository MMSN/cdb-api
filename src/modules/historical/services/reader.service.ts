import { Injectable } from '@nestjs/common';
import { Historical } from '../schemas/historical.schema';
import { CreateCDIEntryDto } from '../dto/create-cdi-entry.dto';
import { CreatorService } from './creator.service';

@Injectable()
export class ReaderService {
  constructor(private readonly creatorService: CreatorService) {}

  async submitAll(content: string): Promise<void> {
    const lines = content.split('\n');

    for (let i = 0; i < content.length; i++) {
      if (lines[i] !== undefined) {
        if (lines[i].includes('CDI')) {
          const entry = await this.generateCDIasDto(lines[i]);
          await this.creatorService.create(entry);
        }
      }
    }
  }

  async generateCDIasDto(line: string): Promise<CreateCDIEntryDto> {
    const lineSplitted = line.replace('\r', '').split(',');
    const date = await this.dateBRtoUS(
      lineSplitted[1].replace('/', '-').replace('/', '-'),
    );
    return { entryDate: date, tax: Number(lineSplitted[2]) };
  }

  async dateBRtoUS(oldDate: string): Promise<string> {
    const oldDateSplitted = oldDate.split('-');
    return `${oldDateSplitted[2]}-${oldDateSplitted[1]}-${oldDateSplitted[0]}`;
  }
}
