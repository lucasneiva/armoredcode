import express from "express";
import { createProfile } from "../controllers/profileController.js";
import { verifyUser } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyUser, createProfile );

export default router;