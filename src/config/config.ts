import dotenv from 'dotenv';

dotenv.config();

const parseOrigins = (value?: string): string[] => {
  if (!value) {
    return ['*'];
  }

  return value
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
};

export const config = {
  app: {
    env: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 3000),
  },
  database: {
    url: process.env.MONGODB_URL || '',
  },
  auth: {
    headerName: 'x-api-key',
    apiKey: process.env.SERVER_API_KEY || '',
  },
  email: {
    resendApiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || '',
    fromName: process.env.RESEND_FROM_NAME || 'Qpay NG',
    replyToEmail: process.env.RESEND_REPLY_TO_EMAIL || process.env.RESEND_FROM_EMAIL || '',
  },
  security: {
    corsOrigins: parseOrigins(process.env.CORS_ORIGINS),
    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000),
    rateLimitMaxRequests: Number(process.env.RATE_LIMIT_MAX_REQUESTS || 100),
  },
};
