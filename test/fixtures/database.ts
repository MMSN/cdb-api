import { EntityManager } from '@mikro-orm/core';
import { Example } from '../../src/modules/example/schemas/example.schema';

export async function wipeDatabase(em: EntityManager): Promise<void> {
  await em.nativeDelete(Example, {});
}
