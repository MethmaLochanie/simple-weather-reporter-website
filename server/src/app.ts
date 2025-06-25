import express, { Request, Response } from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Allow all origins for debugging CORS issues
app.use(cors());

app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/user', userRoutes);

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
