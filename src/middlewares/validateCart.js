import Joi from "joi";

const validaAdicao = Joi.object({
    name: Joi.string().required(),
    url: Joi.number().required(),
    amount: Joi.number().required()/* Joi.string().valid("entrada", "saida").required() */,
    subtotal: Joi.number().required()
});

export async function validaAdic(req, res, next) {
    const { name, url, amount, subtotal } = req.body;
    if (typeof(valor) != "number") {
        return res.status(422).send(`"valor" deve ser numerico`);
    }

    const { error } = validaAdicao.validate({ name, url, amount, subtotal });
    
    if (error) {
        return res.status(422).send(error.details[0].message);
    }

    next();
}