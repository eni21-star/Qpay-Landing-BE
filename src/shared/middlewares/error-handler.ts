import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

import { AppError } from '../errors/app-error';

export const errorHandler = (
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof mongoose.Error) {
    return response.status(400).json({
      success: false,
      message: 'Database request failed.',
    });
  }

  return response.status(500).json({
    success: false,
    message: 'Internal server error.',
  });
};
