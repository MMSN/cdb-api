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
  CreateInvestmentDto,
  FindOneParamsDto,
  ListAllInvestmentsDto,
  UpdateExampleDto,
} from './dtos';
import { ApiHeader, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Investment } from './schemas/investment.schema';
import {
  CreatorService,
  FinderService,
  IndexerService,
  UpdaterService,
  RemoverService,
} from './services';
import { PaginateResult } from '../../shared/contracts/custom.repository';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('investment')
//@ApiSecurity('token')
@ApiTags('investment')
export class InvestmentController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly finderService: FinderService,
    private readonly indexerService: IndexerService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Get()
  findAll(
    @Query() query?: ListAllInvestmentsDto,
  ): Promise<PaginateResult<Investment>> {
    return this.indexerService.index(query);
  }

  @Post()
  create(
    @Body() createInvestmentDto: CreateInvestmentDto,
  ): Promise<Investment> {
    return this.creatorService.create(createInvestmentDto);
  }

  /*  @Get('/:id')
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
  }*/
}