import * as Joi from "joi"

const createArticlesSchema = Joi.object({
    title: Joi.string().max(250).required(),
    description : Joi.string().required(),
    image : Joi.string().required(),
    user : Joi.number().required(),
    createdAt : Joi.date(),
    updateAt : Joi.date()
})

export default createArticlesSchema