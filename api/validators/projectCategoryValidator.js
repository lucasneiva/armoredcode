import Joi from 'joi';

const projectCategoryJoiSchema = Joi.object( {
    categoryName: Joi.string().required(),
    categoryDescription: Joi.string().optional()
} );

export default projectCategoryJoiSchema;
