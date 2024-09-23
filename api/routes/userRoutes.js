import { getById, getUserRole, deleteUser } from '../controllers/userController.js';
import express from 'express';
import { verifyUser } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/:id', verifyUser, getById);

router.get('/:id/role', verifyUser, getUserRole); // New route for getting user role

router.delete('/:id', verifyUser, deleteUser);

export default router;