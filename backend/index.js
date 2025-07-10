import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, './.env') });

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import inviteRoutes from './routes/inviteRoutes.js';

const app = express();

// Middleware
app.use(express.json());

// CORS setup
app.use(cors({
  origin: [
    'https://h-ckollab.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:3003',
    'http://192.168.29.230:3000'
  ],
  credentials: true
}));

// Routes
console.log('✅ Before /api/users');
app.use('/api/users', userRoutes);

console.log('✅ Before /api/projects');
app.use('/api/projects', projectRoutes);

console.log('✅ Before /api/invites');
app.use('/api/invites', inviteRoutes); // ✅ NEW
console.log('✅ /api/invites routes loaded');

// Health check
app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(4000, () => {
  console.log('🚀 Server running on port 4000');
});