import { Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import TokenRetrieverService from '../services/token-retriever.service';

const errorPayload = {
  statusCode: 401,
  message: 'Unauthorized',
};

export async function authenticationMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<any> {
  const loggerService = new Logger(authenticationMiddleware.name);
  const nonAuthenticatedRoutes = ['/health', '/docs'];

  if (nonAuthenticatedRoutes.includes(request.path)) {
    return next();
  }

  let hashToken;
  try {
    hashToken = request.header('token') || request.query.token;

    if (!hashToken) {
      loggerService.debug('Request with missing authentication token');
      return response.status(401).json(errorPayload);
    }
  } catch (e) {
    return response
      .status(401)
      .json({ ...errorPayload, message: 'Missing authentication token' });
  }

  try {
    const token = await new TokenRetrieverService().retrieve(String(hashToken));

    loggerService.debug(`App: ${token.appName} successfully authenticated`);
    return next();
  } catch (e) {
    loggerService.debug(
      `Unable to authenticate with token: ${hashToken}. Error: `,
      e,
    );
    return response.status(401).json(errorPayload);
  }
}
