import { ValidationPipeOptions } from '@nestjs/common';

export const getValidationOptions = (): ValidationPipeOptions => ({
  errorHttpStatusCode: 422,
  whitelist: true,
  transform: true,
});
