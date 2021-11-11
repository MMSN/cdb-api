import { IsMongoId } from 'class-validator';

export class FindOneParamsDto {
  @IsMongoId()
  id: string;
}
