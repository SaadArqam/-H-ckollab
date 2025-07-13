import express from 'express';
import { showInterest, getUserInterestsById } from '../controllers/interestController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';

const router = express.Router();

// Show interest in a project
router.post('/', verifyFirebaseToken, showInterest);

// Get user interests by user ID
router.get('/user/:userId', getUserInterestsById);

export default router; 
