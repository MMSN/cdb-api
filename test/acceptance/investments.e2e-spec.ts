import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreatorService } from '../../src/modules/investment/services';
import { Investment } from '../../src/modules/investment/schemas/investment.schema';
import { givenExample } from '../helpers';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { MikroOrmTestModule } from '../fixtures/mikro-orm-test.module';
import { MikroORM } from '@mikro-orm/core';
import { wipeDatabase } from '../fixtures/database';
import { getValidationOptions } from '../../src/config';
import { InvestmentModule } from 'src/modules/investment/investment.module';

describe('short-stays (e2e)', () => {
  let app: INestApplication;
  let orm: MikroORM;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [
        MikroOrmModule.forRootAsync({ useClass: MikroOrmTestModule }),
        MikroOrmModule.forFeature([Investment]),
        InvestmentModule,
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

  describe('/investments (Post)', () => {
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
