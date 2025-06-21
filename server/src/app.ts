import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Routes
app.use('/api', weatherRoutes);

app.use(errorHandler);

export default app;
