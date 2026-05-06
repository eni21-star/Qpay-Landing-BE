import { NextFunction, Request, Response } from 'express';
import { injectable } from 'tsyringe';

import { config } from '../../config/config';
import { AppError } from '../errors/app-error';

@injectable()
export class ApiKeyAuthMiddleware {
  public handle = async (request: Request, _response: Response, next: NextFunction) => {
    const rawApiKey = request.header(config.auth.headerName)?.trim()
    
    if (!rawApiKey) {
      return next(new AppError('Missing API key.', 401));
    }
    const requestApiKey = rawApiKey.split(" ")[1].trim()
  
    if (!config.auth.apiKey) {
      return next(new AppError('Server API key is not configured.', 500));
    }

    if (requestApiKey !== config.auth.apiKey) {
      return next(new AppError('Invalid API key.', 401));
    }

    return next();
  };
}
