import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
import { User } from "../models/userModel.js";

// dotenv.config();

export const login = async ( req, res ) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ error: "Invalid username or password." });
        }

        console.log("JWT_SECRET: ", process.env.JWT_SECRET);

        if (user.password !== password) {
            return res.status(400).send({ error: "Invalid username or password." });
        }

        console.log("JWT_SECRET: ", process.env.JWT_SECRET);

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );
        res.send({ token });
    } catch (err) {
        res.status(500).send({ error: "Internal server error." })
    }
};