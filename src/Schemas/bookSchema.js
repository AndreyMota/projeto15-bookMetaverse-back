import Joi from "joi";

export const addBookSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().uri({ scheme: ['http', 'https'], allowRelative: false }).required(),
    price: Joi.number().greater(0).required(),
    section: Joi.string().valid('Top', 'Romance', 'HQ', 'Didático', 'Autoajuda').required()
});