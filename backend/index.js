// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import projectRoutes from './routes/projectRoutes.js'; // ✅ Add this

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ API routes
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes); // ✅ Plug project routes

// ✅ Health check route
app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

// ✅ Start server
app.listen(4000, () => {
  console.log('🚀 Server running on port 4000');
});