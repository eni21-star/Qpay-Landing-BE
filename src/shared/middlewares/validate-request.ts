import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { AppError } from '../errors/app-error';

type ClassConstructor<T> = {
  new (): T;
};

export const validateRequest = <T>(dtoClass: ClassConstructor<T>) => {
  return async (request: Request, _response: Response, next: NextFunction) => {
    const dto = plainToInstance(dtoClass, request.body);
    const errors = await validate(dto as object, {
      whitelist: true,
      forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
      const messages = errors
        .flatMap((error) => Object.values(error.constraints || {}))
        .filter(Boolean);

      return next(new AppError(messages.join(', ') || 'Validation failed.', 422));
    }

    request.body = dto;
    return next();
  };
};
