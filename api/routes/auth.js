import express from "express";
import { register, login, sendEmail, resetPassword } from "../controllers/authController.js";

const router = express.Router();

//Register

router.post("/register", register);

// Login

router.post("/login", login);


// send reset email

router.post("/send-email", sendEmail);
export default router;

// Reset Password

router.post("/reset-password", resetPassword);