import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = `http://localhost:${PORT}/movies`;
const TOKEN = process.env.TOKEN;

const movies = [
    { title: "Mad Max: Fury Road", director: "Rupert Miller", year: 2015 },
    { title: "Inception", director: "Christopher Nolan", year: 2010 },
    { title: "The Matrix", director: "The Wachowskis", year: 1999 },
    { title: "Parasite", director: "Bong Joon-ho", year: 2019 },
  ];

const populateDatabase = async () => {
    try {
        for (const movie of movies) {
            const response = await axios.post(BASE_URL, movie, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${TOKEN}`,
                },
            });
            console.log(`Added movie: ${movie.title} - Status: ${response.status}`);
        }
        console.log("Database populated successfully!");
    } catch (err) {
        console.error('Error populating database:', err.response?.data || err.message);
    }
};

populateDatabase();