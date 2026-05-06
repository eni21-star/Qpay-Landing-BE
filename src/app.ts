import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import './container';
import { config } from './config/config';
import { errorHandler } from './shared/middlewares/error-handler';
import { v1Router } from './v1/routes';

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);

app.use(helmet());
app.use(
  cors({
    origin: config.security.corsOrigins.includes('*')
      ? true
      : config.security.corsOrigins,
  }),
);
app.use(
  rateLimit({
    windowMs: config.security.rateLimitWindowMs,
    max: config.security.rateLimitMaxRequests,
    standardHeaders: true,
    legacyHeaders: false,
  }),
);
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: false, limit: '20kb' }));

app.get('/health', (_request, response) => {
  return response.status(200).json({
    success: true,
    message: 'Server is healthy.',
  });
});

app.use('/api/v1', v1Router);
app.use(errorHandler);

export { app };
