import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ExamplesController } from './example.controller';
import { Example } from './schemas/example.schema';
import {
  IndexerService,
  CreatorService,
  UpdaterService,
  FinderService,
  RemoverService,
} from './services';

@Module({
  imports: [MikroOrmModule.forFeature([Example])],
  controllers: [ExamplesController],
  providers: [
    IndexerService,
    CreatorService,
    UpdaterService,
    FinderService,
    RemoverService,
  ],
})
export class ExampleModule {}
