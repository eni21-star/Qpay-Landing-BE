import mongoose from 'mongoose';

import { config } from '../config/config';

export const connectDatabase = async () => {
  if (!config.database.url) {
    throw new Error('MONGODB_URL is required.');
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(config.database.url);
};
