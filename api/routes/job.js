import express from 'express';
import { getAllJobs, getJobById, postJob } from '../controllers/job.controller.js';

const router = express.Router();

router.get('/', getAllJobs);

router.get('/:id', getJobById);

router.post('/', postJob);

export default router;