import * as Joi from "joi"

const createPartaiSchema = Joi.object({
    name: Joi.string().max(250).required(),
    partyLeader : Joi.string().min(3).max(50).required(),
    visionMission :Joi.string().required(),
    address :Joi.string().min(3).max(250).required(),
    paslon : Joi.number(),
    image : Joi.string(),
    createdAt : Joi.date(),
    updateAt : Joi.date()
})

export default createPartaiSchema