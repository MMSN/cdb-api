import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreatorService } from '../../src/modules/example/services';
import { Example } from '../../src/modules/example/schemas/example.schema';
import { givenExample } from '../helpers';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { MikroOrmTestModule } from '../fixtures/mikro-orm-test.module';
import { MikroORM } from '@mikro-orm/core';
import { wipeDatabase } from '../fixtures/database';
import { getValidationOptions } from '../../src/config';
import { ExampleModule } from 'src/modules/example/example.module';

describe('short-stays (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRootAsync({ useClass: MikroOrmTestModule }),
        MikroOrmModule.forFeature([Example]),
        ExampleModule,
      ],
      providers: [CreatorService],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(getValidationOptions()));
    orm = module.get<MikroORM>(MikroORM);

    await app.init();
  });

  beforeEach(async () => wipeDatabase(orm.em));

  afterAll(async () => {
    await orm.close(true);
    await app.close();
  });

  describe('/examples (Post)', () => {
    it('should be able to post a new example', async () => {
      const example = givenExample();
      await request(app.getHttpServer())
        .post('/short-stays')
        .send(example)
        .expect(201)
        .expect(({ body }) => {
          expect(body.name).toBe(example.name);
        });
    });
  });
});
