import { getById } from '../controllers/user.controller.js';
import express from 'express';
import { verifyUser } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/:id', verifyUser, getById);

export default router;