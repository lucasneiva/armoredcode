import express from 'express';
import { searchProjects, getProjectById, createProject } from '../controllers/projectController.js';
import { verifyClient } from '../utils/authMiddleware.js';
import { connectToDatabase } from '../db.js';

const router = express.Router();

router.get( '/search', searchProjects );

router.get( '/:id', getProjectById );

router.post( '/createProject', verifyClient, createProject );

export default router;