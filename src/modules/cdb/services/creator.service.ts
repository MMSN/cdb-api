import { Injectable } from '@nestjs/common';
import { Example } from '../schemas/example.schema';
import { CreateExampleDto } from '../dtos';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class CreatorService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  async create(dto: CreateExampleDto): Promise<Example> {
    return this.exampleRepository.createAsync({ ...dto });
  }
}
