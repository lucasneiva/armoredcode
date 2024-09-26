import express from 'express';
import { searchProjects, getProjectById, createProject, getUserProjects, updateProject, deleteProject, getAllProjects } from '../controllers/projectController.js';
import { verifyClient, verifyFreelancer  } from '../utils/authMiddleware.js';

const router = express.Router();

router.get( '/search', searchProjects );

router.get('/user', verifyClient, getUserProjects);

router.get('/',verifyFreelancer, getAllProjects); // Route to fetch all projects

router.get( '/:id', verifyClient, verifyFreelancer, getProjectById );

router.post( '/', verifyClient, createProject );

router.patch('/:id', verifyClient, updateProject);

router.delete('/:id', verifyClient, deleteProject);

export default router;