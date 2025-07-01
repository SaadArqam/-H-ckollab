import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // Projects route is connected

// Health check
app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

app.listen(4000, () => {
  console.log('🚀 Server running on port 4000');
});
