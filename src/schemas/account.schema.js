import joi from 'joi';

export const SignUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(), 
    password: joi.string().min(3).required(),
    photo: joi.string().required(),
})

export const SignInSchema = joi.object({
    email: joi.string().email().required(), 
    password: joi.string().min(3).required(),
})

export const EditUserSchema = joi.object({
    name: joi.string().min(3).required(),
    city: joi.string().required(),
    author: joi.string().required(),
    photo: joi.string().required(),
    gender: joi.string().required(),
})