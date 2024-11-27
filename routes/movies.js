import express from "express";
import {
  getAllMovies,
  getMovieById,
  postNewMovie, 
  updateMovie,
  deleteMovie
} from "../controllers/movieController.js";

export const router = express.Router();

router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.post("/", postNewMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie)
