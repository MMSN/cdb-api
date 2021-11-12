import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCDIEntryDto {
  @IsNotEmpty()
  @IsISO8601()
  entryDate: string;
  @IsNotEmpty()
  @IsNumber()
  tax: number;
}
