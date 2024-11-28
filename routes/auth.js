import express from "express";
// import dotenv from "dotenv";
import { login } from "../controllers/authController.js";

// dotenv.config();

export const authRouter = express.Router();

authRouter.post("/login", login);