import { IsNumber, IsOptional } from 'class-validator';

export class UpdateInvestmentDto {
  @IsOptional()
  @IsNumber()
  cdbRate: number;
}
