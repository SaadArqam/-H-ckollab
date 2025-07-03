import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';

dotenv.config();

const app = express();
app.use(cors({
  origin: [
    'https://h-ckollab.vercel.app',
    'http://localhost:3000',
    'http://192.168.29.230:3000'
  ],
  credentials: true,
}));
// app.use(cors({
//   origin: true,
//   credentials: true,
// }));

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
console.log('✅ /api/projects route loaded');


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
