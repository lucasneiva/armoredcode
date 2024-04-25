import Joi from 'joi';

const skillJoiSchema = Joi.object({
  skillName: Joi.string().required(),
  skillDescription: Joi.string().optional() 
});

export default skillJoiSchema;
