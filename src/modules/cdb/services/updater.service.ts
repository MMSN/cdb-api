import { Injectable, NotFoundException } from '@nestjs/common';
import { Example } from '../schemas/example.schema';
import { UpdateExampleDto } from '../dtos';
import { ObjectId } from '@mikro-orm/mongodb';
import { wrap } from '@mikro-orm/core';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class UpdaterService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async update(id: string, dto: UpdateExampleDto): Promise<Example> {
    const example = await this.exampleRepository.findOne({
      _id: new ObjectId(id),
    });

    if (!example) {
      throw new NotFoundException();
    }

    wrap(example).assign(dto);
    await this.exampleRepository.flush();
    return example;
  }
}
