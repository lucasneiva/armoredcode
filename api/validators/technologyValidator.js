import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const technologyJoiSchema = Joi.object({
  technologyName: Joi.string().required(),
  technologyDescription: Joi.string().optional() 
});

export default technologyJoiSchema; 
