// backend/routes/userRoutes.js
import express from 'express';
import { getUsers, getUserByClerkId, createUser, updateUserByClerkId } from '../controllers/userController.js';
import prisma from '../lib/prisma.js';
const router = express.Router();

// Define routes
router.get('/', getUsers);
router.get('/clerk/:clerkId', getUserByClerkId);
router.post('/', createUser);
router.post('/seed', async (req, res) => {
    const { clerkId, name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                clerkId,
                name,
                email,
                bio: "This is a temporary user.",
                githubUrl: "https://github.com/yourhandle",
                portfolioUrl: "https://yourportfolio.dev",
                availability: "Available"
            }
        });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to seed user' });
    }
});
router.patch('/clerk/:clerkId', updateUserByClerkId);

export default router;