import express from "express";
import { register, login, registerAdmin, sendEmail } from "../controllers/auth.controller.js";

const router = express.Router();

//Register

router.post("/register", register);

// Login

router.post("/login", login);

// Register Admin

router.post("/register-admin", registerAdmin);

// send reset email

router.post("/send-email", sendEmail);
export default router;