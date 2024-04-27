import express from 'express';
import { getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', getAllJobs);

router.get('/:id', getJobById);

router.post('/', verifyToken, postJob);

export default router;