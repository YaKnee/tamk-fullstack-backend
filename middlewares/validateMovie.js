import Joi from "joi";

const movieValidationSchema = Joi.object({
    title: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.number().integer().min(1888).max(new Date().getFullYear() + 5).required()
});

export const validateMovie = (req, res, next) => {
    const { error } = movieValidationSchema.validate(req.body, { abortEarly: false });
    if (error) {
        const errorMessage = error.details.map((detail) => detail.message);
        return res.status(400).send({errors: errorMessage})
    }
    next();
};