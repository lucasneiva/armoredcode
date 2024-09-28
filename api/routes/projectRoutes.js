import express from 'express';
import { searchProjects, getProjectById, createProject, getUserProjects, updateProject, deleteProject, getAllProjects } from '../controllers/projectController.js';
import { verifyClient, verifyToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get( '/search', searchProjects );

router.get('/user', verifyClient, getUserProjects);

router.get( '/:id', verifyToken, getProjectById );

router.post( '/', verifyClient, createProject );

router.patch('/:id', verifyClient, updateProject);

router.delete('/:id', verifyClient, deleteProject); 

router.get( '/', getAllProjects );

export default router;