import express from "express";
import { createProfile, getProfileById } from "../controllers/profileController.js";
import { verifyToken, verifyUser } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyToken, createProfile );

router.get( "/:id", verifyUser, getProfileById );

export default router;