import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CreatorService } from '../../src/modules/investment/services';
import { Investment } from '../../src/modules/investment/schemas/investment.schema';
import { givenInvestmentWrong, givenInvestmentRight } from '../helpers';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { MikroOrmTestModule } from '../fixtures/mikro-orm-test.module';
import { MikroORM } from '@mikro-orm/core';
import { wipeDatabase } from '../fixtures/database';
import { getValidationOptions } from '../../src/config';
import { InvestmentModule } from '../../src/modules/investment/investment.module';
import { InvestmentFactory } from './investments.factory';

describe('Investments (e2e)', () => {
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

  describe('/investments (Get)', () => {
    it('should be able to reach find all and get an empty array', async () => {
      await request(app.getHttpServer())
        .get('/investment')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            hasNextPage: false,
            hasPrevPage: false,
            limit: 10,
            items: [],
            page: 1,
            totalItems: 0,
            totalPages: 0,
          });
        });
    });

    it('should be able to reach find all and get an array with one element', async () => {
      await new InvestmentFactory(orm.em).createOne();
      await request(app.getHttpServer())
        .get('/investment')
        .expect(200)
        .expect(({ body }) => {
          expect(body.items).toHaveLength(1);
          expect(body).toMatchObject({
            hasNextPage: false,
            hasPrevPage: false,
            limit: 10,
            page: 1,
            totalItems: 1,
            totalPages: 1,
          });
        });
    });

    it('should be able to reach find all and get an array with two element', async () => {
      await new InvestmentFactory(orm.em).createOne();
      await new InvestmentFactory(orm.em).createOne();
      await request(app.getHttpServer())
        .get('/investment')
        .expect(200)
        .expect(({ body }) => {
          expect(body.items).toHaveLength(2);
          expect(body).toMatchObject({
            hasNextPage: false,
            hasPrevPage: false,
            limit: 10,
            page: 1,
            totalItems: 2,
            totalPages: 1,
          });
        });
    });
  });

  describe('/investments (Post)', () => {
    it('should be able to post a new investment', async () => {
      const investment = givenInvestmentRight();
      await request(app.getHttpServer())
        .post('/investment')
        .send(investment)
        .expect(201)
        .expect(({ body }) => {
          expect(body).toHaveProperty('_id');
          expect(body).toHaveProperty('createdAt');
          expect(body).toHaveProperty('updatedAt');
          expect(body.cdbRate).toBe(investment.cdbRate);
          expect(body.investmentDate).toBe(investment.investmentDate);
          expect(body.currentDate).toBe(investment.currentDate);
        });
    });

    it('should not be able to post a new investment with wrong fields', async () => {
      const investment = givenInvestmentWrong();
      await request(app.getHttpServer())
        .post('/investment')
        .send(investment)
        .expect(422)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            error: 'Unprocessable Entity',
            message: [
              'investmentDate must be a valid ISO 8601 date string',
              'cdbRate must be a number conforming to the specified constraints',
              'currentDate must be a valid ISO 8601 date string',
            ],
            statusCode: 422,
          });
        });
    });

    it('should not be able to post a new investment with wrong investmentDate', async () => {
      const investment = givenInvestmentRight();
      investment.investmentDate = 'errado';
      await request(app.getHttpServer())
        .post('/investment')
        .send(investment)
        .expect(422)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            error: 'Unprocessable Entity',
            message: ['investmentDate must be a valid ISO 8601 date string'],
            statusCode: 422,
          });
        });
    });

    it('should not be able to post a new investment with wrong cdbRate', async () => {
      const investment = givenInvestmentRight();
      investment.cdbRate = 'errado' as any;
      await request(app.getHttpServer())
        .post('/investment')
        .send(investment)
        .expect(422)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            error: 'Unprocessable Entity',
            message: [
              'cdbRate must be a number conforming to the specified constraints',
            ],
            statusCode: 422,
          });
        });
    });

    it('should not be able to post a new investment with wrong currentDate', async () => {
      const investment = givenInvestmentRight();
      investment.currentDate = 'errado';
      await request(app.getHttpServer())
        .post('/investment')
        .send(investment)
        .expect(422)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            error: 'Unprocessable Entity',
            message: ['currentDate must be a valid ISO 8601 date string'],
            statusCode: 422,
          });
        });
    });
  });

  describe('/investments/{id} (Get)', () => {
    it('should returns a investment by id', async () => {
      const investment = await new InvestmentFactory(orm.em).createOne();
      const { _id } = investment;
      await request(app.getHttpServer())
        .get(`/investment/${_id}`)
        .expect(200)
        .expect(({ body }) => {
          expect(body.cdbRate).toEqual(investment.cdbRate);
          expect(body.investmentDate).toEqual(investment.investmentDate);
          expect(body.currentDate).toEqual(investment.currentDate);
        });
    });

    it('should not return an invalid investment by id', async () => {
      await request(app.getHttpServer())
        .get('/investment/60d355342e1d540011e77371')
        .expect(404)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            message: 'Not Found',
            statusCode: 404,
          });
        });
    });
  });

  /*  describe('/investments/{id} (Patch)', () => {
    it('should update a investment by id', async () => {
      const investment = await new InvestmentFactory(orm.em).createOne();
      const { _id } = investment;

      const updateInvestment = new InvestmentFactory(orm.em).makeOne();

      await request(app.getHttpServer())
        .patch(`/investment/${_id}`)
        .send(updateInvestment)
        .expect(200)
        .expect(({ body }) => {
          expect(body.cdbRate).toEqual(updateInvestment.cdbRate);
          expect(body.investmentDate).toEqual(updateInvestment.investmentDate);
          expect(body.currentDate).toEqual(updateInvestment.currentDate);
        });
    });

    it('should not update an invalid investment by id', async () => {
      await request(app.getHttpServer())
        .patch('/investment/60d355342e1d540011e77371')
        .expect(404)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            message: 'Not Found',
            statusCode: 404,
          });
        });
    });
  });*/
});
