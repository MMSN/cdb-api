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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('historical')
//@ApiSecurity('token')
@ApiTags('historical')
export class HistoricalController {
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);

    console.log(file.buffer.toString());
    const aux = file.buffer.toString().split('\n');
    console.log(aux.length);
    console.log(aux[0]);
    console.log(aux[aux.length - 1]);
  }
}
