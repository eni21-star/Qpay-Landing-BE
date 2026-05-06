declare global {
  namespace Express {
    interface Request {
      apiKeyId?: string;
    }
  }
}

export {};
