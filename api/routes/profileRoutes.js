import express from "express";
import { createProfile } from "../controllers/profileController.js";
import { verifyToken } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyToken, createProfile );

export default router;