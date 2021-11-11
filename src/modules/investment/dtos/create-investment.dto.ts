import { IsISO8601, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateInvestmentDto {
  @IsNotEmpty()
  @IsISO8601()
  investmentDate: string;
  @IsNotEmpty()
  @IsNumber()
  cdbRate: number;
  @IsNotEmpty()
  @IsISO8601()
  currentDate: string;
}
