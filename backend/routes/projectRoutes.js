// projectRoutes.js

import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
  inviteCollaborators
} from '../controllers/projectController.js';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';

const router = express.Router();

router.post('/', verifyFirebaseToken, createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/:id/invite', verifyFirebaseToken, inviteCollaborators);

//  Use ESM export, not CommonJS
export default router;
