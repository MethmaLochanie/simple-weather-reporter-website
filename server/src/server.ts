import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './database/db';

dotenv.config();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  connectDB();
});

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
  console.log(`\n${signal} received. Graceful shutdown...`);
  
  server.close(() => {
    console.log('HTTP server closed.');
    // might also want to close your database connection here
    // mongoose.connection.close(false, () => {
    //   console.log('MongoDB connection closed.');
    //   process.exit(0);
    // });
    process.exit(0);
  });
};

// Listen for termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
