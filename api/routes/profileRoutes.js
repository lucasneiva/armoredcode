import express from "express";
import { createProfile, getProfileByUserId, updateProfile, deleteProfile } from "../controllers/profileController.js";
import { verifyToken, verifyUser } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyToken, createProfile );

router.get( "/:id", verifyToken, getProfileByUserId );

router.patch("/", verifyToken, updateProfile);

router.delete("/:id", verifyToken, deleteProfile);

export default router;