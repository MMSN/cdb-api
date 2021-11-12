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
        'src/modules/investment/schemas',
        'src/modules/historical/schemas',
      ],
      entities: [
        'dist/shared/schemas',
        'dist/modules/investment/schemas',
        'dist/modules/historical/schemas',
      ],
    };
  }
}
