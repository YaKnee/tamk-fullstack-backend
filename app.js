// Import the libraries
import dotenv from "dotenv";
import express from 'express';
import http from "http";
import https from "https";
import morgan from 'morgan';
import selfsigned from "selfsigned";

// Import routers, schemas, and functions
import { connectToDatabase } from './config/db.js';
import { initializeWebSocket } from './wsConnection.js';
import { movieRouter } from './routes/movies.js';
import { authRouter } from './routes/auth.js';

//Loads environmnetal variable
dotenv.config();

// Initialize an instance of the Express application
const app = express();

// Define the port number the server will listen on
const PORT = process.env.PORT || 3000;


// Use morgan for logging HTTP requests in "dev" format
app.use(morgan("dev"));

// Middleware to parse incoming JSON requests
app.use(express.json());

app.get('/', (req, res) => res.send("Welcome to the movie management system over HTTPS!"));
app.use("/movies", movieRouter);
app.use("/auth", authRouter)


// Generate self-signed certificates
const attributes = [{ name: "commonName", value: "localhost" }];
const options = { days: 365 };
const { private: privateKey, cert: certificate } = selfsigned.generate(attributes, options);

// HTTPS server options
const sslOptions = {
    key: privateKey,
    cert: certificate,
};
//Initialize the https server for the webSocket
const server = https.createServer(sslOptions, app);

const startServer = async () => {
    await connectToDatabase();
    server.listen(PORT, () => {
        console.log(`Server is running on https://localhost:${PORT}`);
    });
}

// Initialize the webSocket and start the CRUD server
initializeWebSocket(server);
startServer();

// Catch-all route to handle undefined routes and return 404
app.all("*", (req, res) => {
    res.status(404).send("Route not found.");
});