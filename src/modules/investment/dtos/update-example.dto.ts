import { IsOptional, IsString } from 'class-validator';

export class UpdateExampleDto {
  @IsOptional()
  @IsString()
  name?: string;
}
