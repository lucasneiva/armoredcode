import express from 'express';
import { createProjectCategory, getProjectCategories, getProjectCategoryById } from '../controllers/projectCategoryController.js';

const router = express.Router();

router.get('/', getProjectCategories);

router.get('/:id', getProjectCategoryById);

router.put('/', createProjectCategory);

export default router;