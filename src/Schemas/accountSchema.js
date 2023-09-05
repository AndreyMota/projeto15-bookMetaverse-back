import joi from 'joi';

export const SignUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    photo: joi.string().uri({ scheme: ['http', 'https'], allowRelative: false }).required(),
});

export const SignInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});

export const EditUserSchema = joi.object({
    name: joi.string().min(3).required(),
    author: joi.string().required(),
    city: joi.string().required(),
    photo: joi.string().uri({ scheme: ['http', 'https'], allowRelative: false }).required(),
    genders: joi.string().required(),
});