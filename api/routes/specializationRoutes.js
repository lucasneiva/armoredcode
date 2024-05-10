import express from 'express';
import { getSpecializations, getSpecializationById, createSpecialization } from '../controllers/specializationController.js';

const router = express.Router();

router.get( '/', getSpecializations );

router.get( '/:id', getSpecializationById );

router.post( '/', createSpecialization );

export default router;