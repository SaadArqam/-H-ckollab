// backend/routes/userRoutes.js
import express from 'express';
import { getUsers, getUserByFirebaseUid, createUser, updateUserByFirebaseUid, getUserProjects, getUserCollaborations, getUserCollaborationsById, getUserProjectsById } from '../controllers/userController.js';
import prisma from '../lib/prisma.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
import cors from 'cors';

const allowedOrigins = [
  'https://h-ckollab.vercel.app',
  'http://localhost:3000'             // for local dev
];

const router = express.Router();

// Define routes
router.get('/', getUsers);
router.get('/firebase/:firebaseUid', getUserByFirebaseUid);
router.get('/firebase/:firebaseUid/projects', getUserProjects);
router.get('/firebase/:firebaseUid/collaborations', getUserCollaborations);
router.get('/:firebaseUid/projects', getUserProjects);
router.get('/:firebaseUid/collaborations', getUserCollaborations);
router.get('/:userId/projects', getUserProjectsById);
router.get('/:userId/collaborations', getUserCollaborationsById);
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
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;