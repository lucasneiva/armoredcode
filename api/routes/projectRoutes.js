import express from 'express';
import { searchProjects, getProjectById, createProject } from '../controllers/projectController.js';
import { verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

router.get( '/search', searchProjects );

router.get( '/:id', getProjectById );

router.post( '/', verifyClient, createProject );

export default router;