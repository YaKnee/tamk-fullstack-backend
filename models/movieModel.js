import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    title: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    year: { 
        type: Number,
        required: true,
        min: 1888,
        max: new Date().getFullYear() + 5
    }
});

movieSchema.virtual("isReleased").get(function() {
    return this.year <= new Date().getFullYear();
});

export const Movie = mongoose.model("Movie", movieSchema, "movies");