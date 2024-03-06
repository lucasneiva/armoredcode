import { getAllUsers, getById } from '../controllers/user.controller.js';
import express from 'express';

const router = express.Router();

///get all
router.get('/', getAllUsers);

//get by id
router.get('/:id', getById);

export default router;