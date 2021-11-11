import { ListAllExamplesDto } from '../dtos';
import { Example } from '../schemas/example.schema';
import { Injectable } from '@nestjs/common';
import { SortOrderEnum } from '../../../shared/enums/sort-order.enum';
import { SortTypeEnum } from '../../../shared/enums/sort-type.enum';
import { PaginateResult } from '../../../shared/contracts/custom.repository';
import { ExampleRepository } from '../repositories/example.repository';

@Injectable()
export class IndexerService {
  constructor(private readonly exampleRepository: ExampleRepository) {}

  index(query: ListAllExamplesDto = {}): Promise<PaginateResult<Example>> {
    const {
      page = 1,
      limit = 10,
      name,
      sortType,
      sortOrder = SortOrderEnum.ASC,
    } = query;
    const select = '_id name description currency properties rules';
    const criteria: { [key: string]: unknown } = {};
    let sortBy = '';

    if (name) {
      criteria.name = { $regex: name, $options: 'i' };
    }

    if (sortType === SortTypeEnum.ALPHABETICAL) {
      sortBy = sortOrder === SortOrderEnum.ASC ? 'name' : '-name';
    }

    return this.exampleRepository.paginate({
      page,
      limit,
      where: criteria,
      select,
      sortBy,
    });
  }
}
