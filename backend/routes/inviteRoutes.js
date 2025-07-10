import express from 'express';
import {
  sendInvite,
  getReceivedInvites,
  respondToInvite,
  testEmailRoute,
} from '../controllers/inviteController.js';

const router = express.Router();

// Send an invite
router.post('/', sendInvite);

// Get all invites received by a user
router.get('/received', getReceivedInvites);

// Accept or decline an invite
router.patch('/:id', respondToInvite);

router.get('/test-email', testEmailRoute);

export default router;