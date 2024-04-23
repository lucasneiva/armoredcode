import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const skillJoiSchema = Joi.object({
  skillName: Joi.string().required(),
  skillDescription: Joi.string().optional() 
});

export default skillJoiSchema;
