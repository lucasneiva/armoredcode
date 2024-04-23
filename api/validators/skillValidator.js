import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const skillJoiSchema = Joi.object({
  skillId: Joi.string().required().custom(objectIdValidation, 'ObjectId Validation'),
  skillName: Joi.string().required(),
  skillDescription: Joi.string().optional() 
});

export default skillJoiSchema;
