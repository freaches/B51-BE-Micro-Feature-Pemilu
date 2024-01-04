import * as Joi from "joi";

const createPaslonSchema = Joi.object({
  name: Joi.string().max(250).required(),
  numberPaslon: Joi.number().positive().required(),
  visionMission: Joi.string().required(),
  image: Joi.string(),
  createdAt: Joi.date(),
  updateAt: Joi.date(),
});

export default createPaslonSchema;
