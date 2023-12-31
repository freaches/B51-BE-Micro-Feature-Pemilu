import * as Joi from "joi"

const createArtcilesSchema = Joi.object({
    title: Joi.string().min(10).max(250),
    author : Joi.string().alphanum().min(10).max(250),
    description : Joi.string(),
    image : Joi.string(),
    date : Joi.string()
})

export default createArtcilesSchema