import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  NotFoundException,
  Delete,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  CreateExampleDto,
  FindOneParamsDto,
  ListAllExamplesDto,
  UpdateExampleDto,
} from './dtos';
import { ApiHeader, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Example } from './schemas/example.schema';
import {
  CreatorService,
  FinderService,
  IndexerService,
  UpdaterService,
  RemoverService,
} from './services';
import { PaginateResult } from '../../shared/contracts/custom.repository';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('examples')
@ApiSecurity('token')
@ApiTags('Examples')
export class ExamplesController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly finderService: FinderService,
    private readonly indexerService: IndexerService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Get()
  findAll(
    @Query() query?: ListAllExamplesDto,
  ): Promise<PaginateResult<Example>> {
    return this.indexerService.index(query);
  }

  @Post()
  create(@Body() createExampleDto: CreateExampleDto): Promise<Example> {
    return this.creatorService.create(createExampleDto);
  }

  @Get('/:id')
  @ApiResponse({ status: 404 })
  async findOne(@Param() params: FindOneParamsDto): Promise<Example> {
    const shortStay = await this.finderService.byId(params.id);

    if (!shortStay) {
      throw new NotFoundException();
    }

    return shortStay;
  }

  @Patch('/:id')
  @ApiResponse({ status: 404 })
  update(
    @Param() params: FindOneParamsDto,
    @Body() updateExampleDto: UpdateExampleDto,
  ): Promise<Example> {
    return this.updaterService.update(params.id, updateExampleDto);
  }

  @Delete('/:id')
  @HttpCode(204)
  @ApiResponse({
    status: 400,
    description: 'Short stay has properties associated',
  })
  @ApiResponse({ status: 404 })
  async destroy(@Param() params: FindOneParamsDto): Promise<void> {
    await this.removerService.byId(params.id);
  }
}
