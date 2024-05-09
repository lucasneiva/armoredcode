import express from 'express';
import { getSkills, getSkillById, createSkill } from '../controllers/skillController.js';

const router = express.Router();

router.get( '/', getSkills );

router.get( '/:id', getSkillById );

router.post( '/', createSkill );

export default router;