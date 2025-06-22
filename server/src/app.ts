import express, { Request, Response } from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import authRoutes from './routes/auth';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// API Routes
app.use('/api', authRoutes);
app.use('/api/weather', weatherRoutes);

// Health Check Route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Basic Welcome Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Weather Reporter API with MongoDB' });
});

app.use(errorHandler);

export default app;
