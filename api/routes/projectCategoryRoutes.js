import express from 'express';
import { getAllprojects } from '../controllers/projectCategoryController.js';

const router = express.Router();

router.get('/', getAllprojects);

expor