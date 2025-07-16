import express from 'express';
import {
  sendInvite,
  getReceivedInvites,
  updateInviteStatus,
  getSentInvites,
  getProjectInvites,
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
router.patch('/:inviteId', updateInviteStatus);
router.get('/sent/:senderId', getSentInvites);

// Test email route
router.get('/test-email', testEmailRoute);

// Get all invites for a project
router.get('/project/:projectId', getProjectInvites);

export default router;
