import Joi from "joi";

const clearBookSchema = Joi.object({
    img: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.string().required(),
    section: Joi.string().required()
})

export const verifyBook = (req, res, next) => {
    const { img, name, price, section } = req.body;

    const { error } = clearBookSchema.validate({ name, price, img, section });

    if (error) {
        const err = error.details[0].message;
        res.status(422).json({ error: err });
        return;
    }
    
    next();
}