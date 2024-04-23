import Joi from 'joi';

const technologyJoiSchema = Joi.object({
  technologyName: Joi.string().required(),
  technologyDescription: Joi.string().optional() 
});

export default technologyJoiSchema; 
