import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';

const jobCategoryJoiSchema = Joi.object( {
    categoryId: Joi.string().required().custom( objectIdValidation, 'ObjectId Validation' ),
    categoryName: Joi.string().required(),
    categoryDescription: Joi.string().optional()
} );

export default jobCategoryJoiSchema;
