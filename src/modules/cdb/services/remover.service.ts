import { Example } from '../schemas/example.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class RemoverService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async byId(id: string): Promise<Example> {
    const criteria = { _id: new ObjectId(id) };
    const example = await this.exampleRepository.findOne(criteria);

    if (!example) {
      throw new NotFoundException();
    }

    return this.exampleRepository.softDelete(example);
  }
}
