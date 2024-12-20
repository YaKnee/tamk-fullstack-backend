import { Movie } from "../models/movieModel.js";

// Function to retrieve all movies
export const getAllMovies = async (req, res) => {
  try {
    const test = await Movie.find();
    if (test.length === 0) return res.status(404).send("No movies in database yet.");

    const validQueries = ["title", "director", "year"];
    let filter = {};

    // Check for invalid query parameters
    const queryKeys = Object.keys(req.query);
    const invalidQueries = queryKeys.filter((key) => !validQueries.includes(key));
    if (invalidQueries.length > 0) {
      return res.status(400).send({
        message: "Invalid query parameter(s) used.",
        invalidQueries: invalidQueries,
        validQueries: validQueries
      });
    }

    // ignores case (i option) and returns those that INCLUDE title/director (regex)
    if (req.query.title) filter.title = {$regex: req.query.title, $options: "i"};
    if (req.query.director) filter.director = {$regex: req.query.director, $options: "i"};
    if (req.query.year) {
      if (isNaN(req.query.year)) {
        return res.status(400).send("Invalid year. It must be a number.");
      }
      filter.year = parseInt(req.query.year);
    }

    const movies = await Movie.find(filter);
    if (movies.length === 0) {
      return res.status(404).send({
        message:"No movies found matching the given query.",
        query: req.query
      });
    }
    return res.status(200).send(movies);
  } catch (err) {
    return res.status(500).send("Error retrieving movies.");
  }
};

// Function to get a movie by ID
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findOne({id: req.params.id});
        if (!movie) {
            return res.status(404).send({ error: "Movie not found." });
        }
        return res.status(200).send(movie);
    } catch (err) {
        return res.status(500).send({ error : "Error retrieving movie." });
    }
};

// Function to create a new movie
export const postNewMovie = async (req, res) => { // Already validated
    const newMovieInfo = req.body;

    try {
        // Sort by id in descending order and get the first result
        const lastMovie = await Movie.findOne().sort({ id: -1 }).limit(1); 
        const newId = lastMovie ? lastMovie.id + 1 : 1;
        const newMovie = new Movie({ ...newMovieInfo, id: newId });
        await newMovie.save();
        return res.status(201).send({ message: "Movie added successfully." });
    } catch (err) {
        return res.status(500).send({ error: "Error adding movie." });
    }
};

// Function to update an existing movies
export const updateMovie = async (req, res) => { // Already validated

    const updatedMovie = req.body;

    try {
        const movie = await Movie.findOneAndUpdate({id: req.params.id}, updatedMovie);
        if (!movie) {
            return res.status(404).send({ error: "Movie not found." });
        }
        return res.status(200).send({ 
          message: "Movie updated successfully.",
          new_movie_details: movie
        });
    } catch (err) {
        return res.status(500).send({ error: "Error updating movie." });
    }
};

// Function to delete a movie by its ID
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({id: req.params.id});
        if (!movie) {
            return res.status(404).send({ error: "Movie not found." });
        }
        return res.status(204).send({ message: "Movie deleted successfully." });
    } catch (err) {
        return res.status(500).send({ error: "Error deleting movie." })
    }
};