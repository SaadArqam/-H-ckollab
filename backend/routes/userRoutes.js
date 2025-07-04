// backend/routes/userRoutes.js
import express from 'express';
import { getUsers, getUserByFirebaseUid, createUser, updateUserByFirebaseUid } from '../controllers/userController.js';
import prisma from '../lib/prisma.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
const router = express.Router();

// Define routes
router.get('/', getUsers);
router.get('/firebase/:firebaseUid', getUserByFirebaseUid);
router.post('/', verifyFirebaseToken, createUser);
router.post('/seed', async (req, res) => {
    const { firebaseUid, name, email } = req.body;
    try {
        const user = await prisma.user.create({
            data: {
                firebaseUid,
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
router.patch('/firebase/:firebaseUid', verifyFirebaseToken, updateUserByFirebaseUid);

export default router;