import express from "express";
import { createProfile } from "../controllers/profileController.js";
import { verifyClient } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyClient, createProfile );

export default router;