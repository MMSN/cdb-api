import { ListAllInvestmentsDto } from '../dtos';
import { Investment } from '../schemas/investment.schema';
import { Injectable } from '@nestjs/common';
import { SortOrderEnum } from '../../../shared/enums/sort-order.enum';
import { SortTypeEnum } from '../../../shared/enums/sort-type.enum';
import { PaginateResult } from '../../../shared/contracts/custom.repository';
import { InvestmentRepository } from '../repositories/investment.repository';

@Injectable()
export class IndexerService {
  constructor(private readonly investmentRepository: InvestmentRepository) {}

  index(
    query: ListAllInvestmentsDto = {},
  ): Promise<PaginateResult<Investment>> {
    const {
      page = 1,
      limit = 10,
      sortType,
      sortOrder = SortOrderEnum.ASC,
    } = query;
    const select = '_id investmentDate cdbRate currentDate';
    const criteria: { [key: string]: unknown } = {};
    let sortBy = '';

    if (sortType === SortTypeEnum.ALPHABETICAL) {
      sortBy = sortOrder === SortOrderEnum.ASC ? 'name' : '-name';
    }

    return this.investmentRepository.paginate({
      page,
      limit,
      where: criteria,
      select,
      sortBy,
    });
  }
}
