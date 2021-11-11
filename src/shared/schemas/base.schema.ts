import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PrimaryKey, Property } from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';

export abstract class BaseSchema {
  @Transform(({ value }) => value.toHexString())
  @ApiProperty({ type: String })
  @PrimaryKey()
  _id!: ObjectId;

  @ApiProperty()
  @Property()
  createdAt: Date = new Date();

  @ApiProperty()
  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  deletedAt?: Date;

  @Property()
  deleted?: boolean;
}
