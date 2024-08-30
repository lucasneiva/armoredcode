import express from 'express';
import { searchProjects, getProjectById, createProject, getUserProjects, updateProject, deleteProject } from '../controllers/projectController.js';
import { verifyClient } from '../utils/authMiddleware.js';

const router = express.Router();

router.get( '/search', searchProjects );

router.get('/user', verifyClient, getUserProjects);

router.get( '/:id', verifyClient, getProjectById );

router.post( '/', verifyClient, createProject );

router.patch('/:id', verifyClient, updateProject);

router.delete('/:id', verifyClient, deleteProject);

export default router;