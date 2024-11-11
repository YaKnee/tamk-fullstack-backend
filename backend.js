// Import the Express framework to create a web application
import express from 'express';
import morgan from 'morgan';

// Initialize an instance of the Express application
const app = express();

// Define the port number the server will listen on
const PORT = 6969;

// Array to hold the movie collection with details for each movie
const movies = [
    { id: 1, title: "Inception", director: "Christopher Nolan", year: 2010 },
    { id: 2, title: "The Matrix", director: "The Wachowskis", year: 1999 },
    { id: 3, title: "Parasite", director: "Bong Joon-ho", year: 2019 },
];

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
app.get("/", (req, res) => {
    let movieList = "<h1>Movie Collection:</h1><ul>";
    // Loop through each movie to generate list items for the HTML response
    movies.forEach(movie => {
        movieList += `<li>${movie.title} (Directed by ${movie.director}, ${movie.year})</li>`;
    });
    movieList += "</ul>";
    // Send the generated HTML back to the client
    res.send(movieList);
});

// Route to return the full movie collection as a JSON response with filtering support
app.get("/movies", (req, res) => {
    const { title, director, year } = req.query;

    let filteredMovies = movies;

    if (title) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.title.toLowerCase().includes(title.toLowerCase()));
    }

    if (director) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.director.toLowerCase().includes(director.toLowerCase()));
    }

    if (year) {
        filteredMovies = filteredMovies.filter(movie => 
            movie.year == year);
    }

    // If no movies match the filters, return an empty array
    if (filteredMovies.length === 0) {
        return res.status(404).send("No movies found matching the given criteria.");
    }

    // Return the filtered list of movies
    res.status(200).send(filteredMovies);
});

// Route to return a specific movie by its ID in the URL parameter
app.get("/movies/:id", (req, res) => {
    // Parse the movie ID from the request parameters
    const movieId = parseInt(req.params.id);
    // Find the movie with the matching ID
    const movie = movies.find(m => m.id === movieId);

    // If the movie is not found, send a 404 response
    if (!movie) {
        return res.status(404).send("Movie not found.");
    }
    // Send the found movie as a JSON response
    res.status(200).send(movie);
});

// Route to add a new movie to the collection
app.post("/movies", (req, res) => {
    const validationError = validateMovie(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const { title, director, year } = req.body;

    // Generate a unique ID for the new movie
    const newId = movies.length > 0 ? Math.max(...movies.map(m => m.id)) + 1 : 1;
    // Create the new movie object
    const newMovie = { id: newId, title, director, year };

    // Add the new movie object to the movies array
    movies.push(newMovie);
    // Send a success response back to the client
    res.status(201).send("Movie added successfully.");
});

// Route to update a movie by its ID
app.put("/movies/:id", (req, res) => {
    // Parse the movie ID from the request parameters
    const movieId = parseInt(req.params.id);
    // Find the index of the movie with the matching ID
    const movieIndex = movies.findIndex(m => m.id === movieId);

    // If the movie is not found, send a 404 response
    if (movieIndex === -1) {
        return res.status(404).send("Movie not found.");
    }


    const validationError = validateMovie(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const { title, director, year } = req.body;

    // Update the movie's details with the data from the request body
    movies[movieIndex] = {id: movieId, title, director, year};

    // Send a success response back to the client
    res.status(200).send("Movie updated successfully.");
});

// Route to delete a movie by its ID
app.delete("/movies/:id", (req, res) => {
    // Parse the movie ID from the request parameters
    const movieId = parseInt(req.params.id);
    // Find the index of the movie with the matching ID
    const movieIndex = movies.findIndex(m => m.id === movieId);

    // If the movie is not found, send a 404 response
    if (movieIndex === -1) {
        return res.status(404).send("Movie not found.");
    }

    // Remove the movie from the array
    movies.splice(movieIndex, 1);
    // Send a success response back to the client
    res.status(204).send("Movie deleted successfully.");
});

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});