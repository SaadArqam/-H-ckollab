import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express(); //  This was missing!

app.use(express.json());

// CORS setup
app.use(cors({
  origin: [
    'https://h-ckollab.vercel.app',
    'http://localhost:3000',
    'http://192.168.29.230:3000',
    'http://localhost:3002',
    'http://localhost:3001'
  ],
  credentials: true
}));


// Routes
console.log('✅ Before /api/users');
app.use('/api/users', userRoutes);

console.log('✅ Before /api/projects');
app.use('/api/projects', projectRoutes);

console.log('✅ /api/users and /api/projects routes loaded');

// Health check
app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(4000, () => {
  console.log('🚀 Server running on port 4000');
});
