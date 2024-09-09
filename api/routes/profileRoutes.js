import express from "express";
import { createProfile, getProfileById, updateProfile } from "../controllers/profileController.js";
import { verifyToken, verifyUser } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyToken, createProfile );

router.get( "/:id", verifyToken, getProfileById );

router.patch("/", verifyToken, updateProfile);

export default router;