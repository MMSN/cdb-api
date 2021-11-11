import { Repository } from '@mikro-orm/core';
import { CustomRepository } from '../../../shared/contracts/custom.repository';
import { Example } from '../schemas/example.schema';

@Repository(Example)
export class ExampleRepository extends CustomRepository<Example> {}
