import { ApiProperty } from '@nestjs/swagger';
import { Entity, Filter, Property } from '@mikro-orm/core';
import { BaseSchema } from '../../../shared/schemas/base.schema';

@Filter({
  name: 'active',
  cond: () => ({ deleted: { $ne: true } }),
  args: false,
  default: true,
})
@Entity({ collection: 'short-stays' })
export class Investment extends BaseSchema {
  @ApiProperty()
  @Property()
  investmentDate: string;
  @ApiProperty()
  @Property()
  cdbRate: number;
  @ApiProperty()
  @Property()
  currentDate: string;
}
