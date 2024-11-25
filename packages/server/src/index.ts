import express from 'express';
import cors from 'cors';

import { connectDB, disconnectDB } from './config/databaseHandler.js';
import envsHandler from './config/envsHandler.js';
import errorMiddleware from './middleware/errorMiddleware.js';
import responseMiddleware from './middleware/responseMiddleware.js';
import taskRoutes from './core/routes/taskRoutes.js';
import healthRoutes from './core/routes/healthRoutes.js';
import notFoundMiddleware from './middleware/notFoundMiddleware.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(taskRoutes);
app.use(healthRoutes);
app.use(errorMiddleware);
app.use(notFoundMiddleware);
app.use(responseMiddleware);

const startServer = async () => {
  envsHandler.validate();
  await connectDB();
  return app.listen(process.env.API_PORT);
};

const shutdownServer = async (signal: string) => {
  console.log(`\nGracefully shutting down server with ${signal}...`);
  await disconnectDB();
  console.log('\nGoodbye!! 👋\n');
  process.exit(signal === 'SIGINT' ? 0 : 1);
};

startServer().then(() => {
  console.log(`\nAPI running on port ${process.env.API_PORT} 🚀 \nHappy Coding!✨\n `);
  new Promise((resolve) => {
    process.on('SIGINT', resolve);
  })
    .then(() => shutdownServer('SIGINT'))
    .catch(() => shutdownServer('SIGTERM'));
}).catch((error) => {
  console.error('📛 Failed to start server:', error.message);
  process.exit(1);
});
