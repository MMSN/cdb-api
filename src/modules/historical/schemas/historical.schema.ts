import { ApiProperty } from '@nestjs/swagger';
import { Entity, Filter, Property } from '@mikro-orm/core';
import { BaseSchema } from '../../../shared/schemas/base.schema';

@Filter({
  name: 'active',
  cond: () => ({ deleted: { $ne: true } }),
  args: false,
  default: true,
})
@Entity({ collection: 'Historical' })
export class Historical extends BaseSchema {
  @ApiProperty()
  @Property()
  entryDate: string;
  @ApiProperty()
  @Property()
  tax: number;
}
