import { Injectable } from '@nestjs/common';
import {
  MikroOrmModuleOptions,
  MikroOrmOptionsFactory,
} from '@mikro-orm/nestjs';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = MongoMemoryServer.create();

@Injectable()
export class MikroOrmTestModule implements MikroOrmOptionsFactory {
  async createMikroOrmOptions(): Promise<MikroOrmModuleOptions> {
    return {
      type: 'mongo',
      tsNode: true,
      clientUrl: (await mongoServer).getUri(),
      entitiesTs: [
        'src/shared/schemas',
        'src/modules/prices/schemas',
        'src/modules/short-stays/schemas',
        'src/modules/custom-dates/schemas',
      ],
      entities: [
        'dist/shared/schemas',
        'dist/modules/prices/schemas',
        'dist/modules/short-stays/schemas',
        'dist/modules/custom-dates/schemas',
      ],
    };
  }
}
