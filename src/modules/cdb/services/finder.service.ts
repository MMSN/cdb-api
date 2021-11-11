import { Example } from '../schemas/example.schema';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ObjectId } from '@mikro-orm/mongodb';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class FinderService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async byId(id: string): Promise<Example> {
    const example = await this.exampleRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!example) {
      throw new NotFoundException();
    }

    return example;
  }
}
