// projectRoutes.js

import express from 'express';
import {
  createProject,
  getAllProjects,
  getProjectById,
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', createProject);
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

//  Use ESM export, not CommonJS
export default router;
