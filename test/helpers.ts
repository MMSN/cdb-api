import * as Casual from 'casual';
import { CreateExampleDto } from 'src/modules/example/dtos';

export function givenExample(): CreateExampleDto {
  return {
    name: Casual.name,
  };
}
