import { UploadedFile } from '@nestjs/common';
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
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { ApiHeader, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Readable } from 'stream';
import { ReaderService } from './services/reader.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('historical')
//@ApiSecurity('token')
@ApiTags('historical')
export class HistoricalController {
  constructor(private readonly readerService: ReaderService) {}
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.readerService.submitAll(file.buffer.toString());
  }
}
