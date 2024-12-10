import express from "express";
import {
  getAllMovies,
  getMovieById,
  postNewMovie, 
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import { validateMovie } from "../middlewares/validateMovie.js";
import { authenticate } from "../middlewares/authenticateUser.js";

export const movieRouter = express.Router();

// Viewing movies requires to be an authenticated user
movieRouter.get("/", authenticate(["admin", "regular"]),getAllMovies);
movieRouter.get("/:id", authenticate(["admin", "regular"]), getMovieById);
// Posting/Editing/Deleting requires admin privileges
movieRouter.post("/", authenticate(["admin"]), validateMovie, postNewMovie); // Validate before create
movieRouter.put("/:id",  authenticate(["admin"]), validateMovie, updateMovie); // Validate before update
movieRouter.delete("/:id",  authenticate(["admin"]), deleteMovie)
