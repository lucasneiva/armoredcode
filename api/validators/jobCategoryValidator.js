import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const jobCategoryJoiSchema = Joi.object( {
    categoryName: Joi.string().required(),
    categoryDescription: Joi.string().optional()
} );

export default jobCategoryJoiSchema;
