// Import the libraries
import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import { connectToDatabase } from './config/db.js';
import { router as movieRoutes } from './routes/movies.js';
import { Movie } from './models/movieModel.js';

//Loads environmnetal variable
dotenv.config();

// Initialize an instance of the Express application
const app = express();

// Define the port number the server will listen on
const PORT = 6969;

// Use morgan for logging HTTP requests in "dev" format
app.use(morgan("dev"));

// Middleware to parse incoming JSON requests
app.use(express.json());


app.use("/movies", movieRoutes);
//app.use("/auth", authRoutes)

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

const startServer = async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

startServer();

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});