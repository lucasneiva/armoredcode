import Joi from 'joi';
import objectIdValidation from './objectIdValidator.js';
import jobCategoryJoiSchema from './jobCategoryValidator.js';
import skillJoiSchema from './skillValidator.js';
import technologyJoiSchema from './technologyValidator.js';

const requirementJoiSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    requirementType: Joi.string().valid('SOURCE_CODE', 'DOCUMENTATION', 'TEST_REPORT').required()
});

const jobJoiSchema = Joi.object({
    clientId: Joi.string().required().custom(objectIdValidation, 'ObjectId Validation'),
    freelancerId: Joi.string().optional().custom(objectIdValidation, 'ObjectId Validation'),
    jobCategory: jobCategoryJoiSchema.required(),
    skills: Joi.array().items(skillJoiSchema), 
    technologies: Joi.array().items(technologyJoiSchema),
    requirements: Joi.array().items(requirementJoiSchema), 
    jobTitle: Joi.string().required(),
    jobDescription: Joi.string().required(),
    hourlyRateLowerBound: Joi.number().optional(),
    hourlyRateUpperBound: Joi.number().optional(),
    isFixedRate: Joi.boolean().optional(), 
    fixedBudget: Joi.number().optional(),
    estimatedDuration: Joi.number().optional(), 
    jobSize: Joi.string().valid('SMALL', 'MEDIUM', 'LARGE'),
    status: Joi.string().valid('DRAFT', 'POSTED'),  
    experienceLevel: Joi.string().valid('ENTRY-LEVEL', 'MID-LEVEL', 'SENIOR'),
    startDate: Joi.date().optional(),   
    endDate: Joi.date().optional(),
    isRemote: Joi.boolean().optional(),
    city: Joi.string().valid('SOROCABA', 'VOTORANTIM', 'ITU', 'ARAÇOIABA DA SERRA', 'PORTO FELIZ')
});

export default jobJoiSchema;
