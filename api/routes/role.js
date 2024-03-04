import express from 'express';

import { createRole, updateRole, getAllRoles, deleteRole } from '../controllers/role.controller.js';

const router = express.Router();

//Create a new role in DB
router.post('/create', createRole);

//Update role in DB
router.put('/update/:id', updateRole);

//Get all roles from DB
router.get('/getAll', getAllRoles);

router.delete('/delete/:id', deleteRole);

export default router;