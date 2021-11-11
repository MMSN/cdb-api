import {
  EntityRepository as MikroEntityRepository,
  wrap,
} from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';

export abstract class PaginateResult<T = any> {
  @ApiProperty()
  items: T[];
  @ApiProperty()
  page: number;
  @ApiProperty()
  limit: number;
  @ApiProperty()
  totalItems: number;
  @ApiProperty()
  totalPages: number;
  @ApiProperty()
  hasNextPage: boolean;
  @ApiProperty()
  hasPrevPage: boolean;
}

interface PaginateOptions<T> {
  where: Partial<T>;
  page: number;
  limit: number;
  select?: string;
  sortBy?: any;
}

export abstract class CustomRepository<
  T = any
> extends MikroEntityRepository<T> {
  async createAsync(body: Partial<T>): Promise<T> {
    const record = this.create(body);
    await this.persistAndFlush(record);
    return record;
  }

  async bulkCreateAsync(body: Partial<T>[]): Promise<T[]> {
    const records = body?.map((data) => this.create(data));
    await this.persistAndFlush(records);
    return records;
  }

  async softDelete(payload): Promise<T> {
    wrap(payload).assign({
      deleted: true,
      deletedAt: new Date(),
    });
    await this.flush();
    return payload;
  }

  async paginate(options: PaginateOptions<T>): Promise<PaginateResult<T>> {
    const { page = 1, limit = 100, where, sortBy } = options;
    const offset = (page - 1) * limit;
    const [items, totalItems] = await this.findAndCount(where, {
      limit,
      offset,
      orderBy: sortBy,
    });

    return {
      items: items.map(this.serialize),
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      hasNextPage: totalItems / limit > page,
      hasPrevPage: page > 1,
    };
  }

  private serialize(item: any): T {
    return {
      _id: item._id.toHexString(),
      ...item,
    };
  }

  async findOneAndUpdate(where: Partial<T>, body: Partial<T>): Promise<T> {
    const result = await this.findOne(where);
    wrap(result).assign(body);
    await this.persistAndFlush(result);
    return result;
  }
  async updateMany(
    where: Partial<T> | any,
    body: Partial<T> | any,
  ): Promise<any> {
    return this.nativeUpdate(where, body);
  }
}
