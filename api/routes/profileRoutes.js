import express from "express";
import { createProfile, getProfileByUserId, updateProfile, deleteProfile, getAllFreelancerProfiles } from "../controllers/profileController.js";
import { verifyToken, verifyUser } from "../utils/authMiddleware.js";

const router = express.Router();

router.post( "/", verifyToken, createProfile );

router.patch("/", verifyToken, updateProfile);

router.delete("/:id", verifyToken, deleteProfile);

// Use a different route path for fetching all freelancer profiles 
router.get("/freelancers", verifyToken, getAllFreelancerProfiles); 

// Route for fetching a profile by user ID
router.get("/:id", verifyToken, getProfileByUserId);

export default router;