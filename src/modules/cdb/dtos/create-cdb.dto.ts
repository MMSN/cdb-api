import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateExampleDto {
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
