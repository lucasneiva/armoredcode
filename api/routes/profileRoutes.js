import express from "express";
import { postProfile } from "../controllers/profileController.js";

const router = express.Router();

router.post( "/", postProfile );

export default router;