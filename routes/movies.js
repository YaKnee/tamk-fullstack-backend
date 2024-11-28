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

movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);
//These operations require authentication
movieRouter.post("/", authenticate, validateMovie, postNewMovie);
movieRouter.put("/:id", authenticate, validateMovie, updateMovie);
movieRouter.delete("/:id", authenticate, deleteMovie)
