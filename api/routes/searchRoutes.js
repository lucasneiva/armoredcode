import express from 'express';
import { searchProjects, searchFreelancers } from '../controllers/searchController.js';
const router = express.Router();

router.get('/projects/', searchProjects);

router.get('/freelacers/', searchFreelancers);

export default router;