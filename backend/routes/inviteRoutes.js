import express from 'express';
import {
  sendInvite,
  getReceivedInvites,
  respondToInvite,
  testEmailRoute,
  getUserInvitesByFirebaseUid,
} from '../controllers/inviteController.js';

import { verifyFirebaseToken } from "../middleware/firebaseAuth.js";

const router = express.Router();

// Send an invite
router.post("/", verifyFirebaseToken, sendInvite);

// Get all invites received by a user
router.get('/received', getReceivedInvites);

// Get user invites by Firebase UID
router.get('/user/:firebaseUid', getUserInvitesByFirebaseUid);

// Accept or decline an invite
router.patch('/:id', respondToInvite);

// Test email route
router.get('/test-email', testEmailRoute);

export default router;
