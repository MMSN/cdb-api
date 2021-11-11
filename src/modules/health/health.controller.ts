import { Controller, Get, Ip } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  @Get()
  getHealth(@Ip() ipAddress: string) {
    return {
      status: 'OK',
      version: process.env.npm_package_version,
      host: ipAddress,
    };
  }
}
