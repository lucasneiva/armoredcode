import Joi from 'joi';

const jobCategoryJoiSchema = Joi.object( {
    categoryName: Joi.string().required(),
    categoryDescription: Joi.string().optional()
} );

export default jobCategoryJoiSchema;
