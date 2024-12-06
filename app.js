// Import the libraries
import express from 'express';
import morgan from 'morgan';
import dotenv from "dotenv";
import http from "http";

// Import routers, schemas, and functions
import { connectToDatabase } from './config/db.js';
import { initializeWebSocket } from './wsConnection.js';
import { movieRouter } from './routes/movies.js';
import { authRouter } from './routes/auth.js';
import { Movie } from './models/movieModel.js';


//Loads environmnetal variable
dotenv.config();

// Initialize an instance of the Express application
const app = express();

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;

//Initialize the http server for the webSocket
const server = http.createServer(app);

// Use morgan for logging HTTP requests in "dev" format
app.use(morgan("dev"));

// Middleware to parse incoming JSON requests
app.use(express.json());


app.use("/movies", movieRouter);
app.use("/auth", authRouter)

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
    server.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

// Initialize the webSocket and start the CRUD server
initializeWebSocket(server);
startServer();

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});