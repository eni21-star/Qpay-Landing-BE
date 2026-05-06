import { app } from './app';
import { config } from './config/config';
import { connectDatabase } from './database/mongoose';

const startServer = async () => {
  await connectDatabase();

  app.listen(config.app.port, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${config.app.port}`);
  });
};

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', error);
  process.exit(1);
});
