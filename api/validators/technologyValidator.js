import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const technologyJoiSchema = Joi.object({
  technologyId: Joi.string().required().custom(objectIdValidation, 'ObjectId Validation'),
  technologyName: Joi.string().required(),
  technologyDescription: Joi.string().optional() 
});

export default technologyJoiSchema; 
