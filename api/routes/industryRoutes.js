import express from 'express';
import { getIndustries, getIndustryById, createIndustry } from '../controllers/industryController.js';

const router = express.Router();

router.get( '/', getIndustries );

router.get( '/:id', getIndustryById );

router.post( '/', createIndustry );

export default router;