import express from 'express';
import { getAllprojects, getprojectById, postproject } from '../controllers/project.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', getAllprojects);

router.get('/:id', getprojectById);

router.post('/', verifyToken, postproject);

export default router;