// index.js
import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'; // your route file

const app = express();
app.use(cors());
app.use(express.json());

//  Use the route
app.use('/api/users', userRoutes); // This is critical

app.get('/api/health', (req, res) => {
  res.send('API is healthy');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
