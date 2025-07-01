// backend/controllers/userController.js
import prisma from '../lib/prisma.js';

// This file will contain user-related controller functions
// For now, it's a placeholder until user functionality is implemented

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    // Check for database connection error
    if (error.message && (error.message.includes('connect to the database') || 
        error.message.includes("Can't reach database server") || 
        error.constructor.name === 'PrismaClientInitializationError')) {
      return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
    }
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};