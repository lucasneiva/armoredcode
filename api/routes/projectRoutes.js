import express from 'express';
import { getProjectById, createProject, getUserProjects, updateProject, deleteProject, getPostedProjects, getPostedUserProjects } from '../controllers/projectController.js';
import { verifyClient, verifyToken } from '../utils/authMiddleware.js';
import { createRating, getProjectRatings, checkRatingCompletion  } from '../controllers/ratingController.js';

const router = express.Router();

router.get('/user', verifyToken, getUserProjects);

router.get( '/:id', verifyToken, getProjectById );

router.post( '/', verifyClient, createProject );

router.patch('/:id', verifyToken, updateProject);

router.delete('/:id', verifyClient, deleteProject); 

router.get( '/', getPostedProjects );

router.get('/user/posted', verifyToken, getPostedUserProjects); // New route

// Rating Routes
router.post('/ratings', verifyToken, createRating);

router.get('/projects/:projectId/ratings', getProjectRatings);

router.get('/projects/:projectId/ratings/complete', checkRatingCompletion); // Use the controller function


export default router;