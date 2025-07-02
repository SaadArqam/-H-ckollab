// backend/controllers/userController.js
import prisma from '../lib/prisma.js';

// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        if (error.message && (
            error.message.includes('connect to the database') ||
            error.message.includes("Can't reach database server") ||
            error.constructor.name === 'PrismaClientInitializationError')) {
            return res.status(503).json({ error: 'Database connection failed. Please ensure PostgreSQL is running.' });
        }
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

// ✅ Add this function to fix the import error
export const getUserByClerkId = async (req, res) => {
    try {
        const { clerkId } = req.params;
        const user = await prisma.user.findUnique({ where: { clerkId } });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json(user);
    } catch (err) {
        console.error('Error fetching user by Clerk ID:', err.message);
        res.status(500).json({ error: 'Server error' });
    }
};
