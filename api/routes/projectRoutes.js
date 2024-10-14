import express from 'express';
import { getProjectById, createProject, getUserProjects, updateProject, deleteProject, getPostedProjects } from '../controllers/projectController.js';
import { verifyClient, verifyToken } from '../utils/authMiddleware.js';

const router = express.Router();

router.get('/user', verifyToken, getUserProjects);

router.get( '/:id', verifyToken, getProjectById );

router.post( '/', verifyClient, createProject );

router.patch('/:id', verifyToken, updateProject);

router.delete('/:id', verifyClient, deleteProject); 

router.get( '/', getPostedProjects );

export default router;