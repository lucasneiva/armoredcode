import express from 'express';
import { getAllprojects, getprojectById, postproject } from '../controllers/projectController.js';
import { verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/', getAllprojects);

router.get('/:id', getprojectById);

router.post('/', verifyClient, postproject);

export default router;