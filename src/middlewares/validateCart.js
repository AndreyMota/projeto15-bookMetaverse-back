import Joi from "joi";

const validaAdicao = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().required(),
    url: Joi.string().required(),
    amount: Joi.number().required()/* Joi.string().valid("entrada", "saida").required() */,
    subtotal: Joi.number().required()
});

export async function validaAdic(req, res, next) {
    const { id, name, url, amount, subtotal } = req.body;
    if (typeof(amount) != "number") {
        return res.status(422).send(`"amount" deve ser numerico`);
    }
    if (typeof(subtotal) != "number") {
        return res.status(422).send(`"subtotal" deve ser numerico`);
    }

    const { error } = validaAdicao.validate({ id, name, url, amount, subtotal });
    
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}