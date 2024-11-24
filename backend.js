// Import the libraries
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import dotenv from "dotenv";

//Loads environmnetal variable
dotenv.config();

// Initialize an instance of the Express application
const app = express();

// Define the port number the server will listen on
const PORT = 6969;

// Connect to my Mongo DB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB Atlas."))
    .catch(err => console.error("Could not conenct to MongoDB: ", err));

const movieSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true }
});

const Movie = mongoose.model("Movie", movieSchema, "movies");

// Use morgan for logging HTTP requests in "dev" format
app.use(morgan("dev"));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Function to validate movie data
function validateMovie(movie) {
    const { title, director, year } = movie;
    if (!title || !director || !year) {
        return "Required fields: title, director, year.";
    }
    if (isNaN(year) || year < 1888 || year > (new Date().getFullYear() + 10)) {
        return "Year must be a number after 1888 and before 10 years in future.";
    }
    return null; // Validation passed
}

// Route to serve a basic HTML page listing all movies in the collection
app.get("/", async (req, res) => {
    try {
        const movies = await Movie.find();
        let html = "<h1>Movie Collection</h1><ul>"
        movies.forEach(movie => {
            html += `<li>Title: ${movie.title}, Year: ${movie.year}, Director: ${movie.director}</li>`;
        })
        html += "</ul>";
        res.send(html);
    } catch (err) {
        res.status(500).send("Error retrieving movies.")
    }
});

// Route to return the full movie collection as a JSON response with filtering support
app.get("/movies", async (req, res) => {
    try {
        const { title, director, year } = req.query;

        let filter = {};
        // ignores case (i option) and returns those that INCLUDE title/director (regex)
        if (title) filter.title = { $regex: title, $options: 'i' };
        if (director) filter.director = { $regex: director, $options: 'i' };
        if (year) {
            if (isNaN(year)) {
                return res.status(400).send("Invalid year. It must be a number.");
            }
            filter.year = parseInt(year);
        }
        if (Object.keys(filter).length === 0) {
            return res.status(400).send({
                message: 'No valid filters provided. Use only "title", "director", or "year".',
                query: req.query
            });
        }
        const movies = await Movie.find(filter);
        if (movies.length === 0 ){
            return res.status(404).send("No movies found matching the given query.")
        }
        res.status(200).send(movies);
    } catch (err) {
        res.status(500).send("Error retrieving movies.");
    }
});

// Route to return a specific movie by its ID in the URL parameter
app.get("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findOne({id: req.params.id});
        if (!movie) {
            return res.status(404).send("Movie not found.");
        }
        res.status(200).send(movie);
    } catch (err) {
        res.status(500).send("Error retrieving movie.");
    }
});

// Route to add a new movie to the collection
app.post("/movies", async (req, res) => {
    const validationError = validateMovie(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const newMovieInfo = req.body;

    try {
        // Sort by id in descending order and get the first result
        const lastMovie = await Movie.findOne().sort({ id: -1 }).limit(1); 
        const newId = lastMovie ? lastMovie.id + 1 : 1;
        const newMovie = new Movie({ ...newMovieInfo, id: newId });
        await newMovie.save();
        res.status(201).send("Movie added successfully.");
    } catch (err) {
        res.status(500).send("Error adding movie.");
    }
});

// Route to update a movie by its ID
app.put("/movies/:id", async (req, res) => {
    const validationError = validateMovie(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const updatedMovie = req.body;

    try {
        const movie = await Movie.findOneAndUpdate({id: req.params.id}, updatedMovie);
        if (!movie) {
            return res.status(404).send("Movie not found.");
        }
        res.status(200).send("Movie updated successfully.");
    } catch (err) {
        res.status(500).send("Error updating movie.");
    }
});

// Route to delete a movie by its ID
app.delete("/movies/:id", async (req, res) => {
    try {
        const movie = await Movie.findOneAndDelete({id: req.params.id});
        if (!movie) {
            return res.status(404).send("Movie not found.");
        }
        res.status(204).send("Movie deleted successfully.");
    } catch (err) {
        res.status(500).send("Error deleting movie.")
    }
});

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});