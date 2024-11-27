import express from "express";
import {
  getAllMovies,
  getMovieById,
  postNewMovie, 
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";
import { validateMovie } from "../middlewares/validateMovie.js";

export const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", validateMovie, postNewMovie);
router.put("/:id", validateMovie, updateMovie);
router.delete("/:id", deleteMovie)
