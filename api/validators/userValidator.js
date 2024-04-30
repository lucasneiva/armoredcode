import Joi from 'joi';

const userJoiSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profileImage: Joi.string().uri().allow('').optional(),
    isAdmin: Joi.boolean().optional(),
    roles: Joi.array().items(Joi.string()).optional()
});

export default userJoiSchema;
