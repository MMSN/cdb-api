import { EntityManager } from '@mikro-orm/core';
import { Investment } from '../../src/modules/investment/schemas/investment.schema';

export async function wipeDatabase(em: EntityManager): Promise<void> {
  await em.nativeDelete(Investment, {});
}
