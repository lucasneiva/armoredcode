import express from 'express';
import { getAllprojects, getProjectById, postProject } from '../controllers/projectController.js';
import { verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

router.get( '/', getAllprojects );

router.get( '/:id', getProjectById );

router.post( '/', verifyClient, postProject );

export default router;