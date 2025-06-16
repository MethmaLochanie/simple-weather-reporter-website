import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weather';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/weather', weatherRoutes);

app.use(errorHandler);

export default app;
