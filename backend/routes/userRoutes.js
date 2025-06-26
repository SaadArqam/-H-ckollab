import express from 'express';
import {
    getAllUsers,
    getUserById,
    createOrUpdateUser
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createOrUpdateUser);

export default router;
