
// userValidator.js
import { generateValidator } from './validatorGenerator.js';
import User from '../models/userModel.js';

const userJoiSchema = generateValidator( User.schema );

export default userJoiSchema;

/* MORE COMPLEX PASSWORD FOR LATE
    password: Joi.string().min(8) // Minimum 8 characters
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])')) // At least 1 lowercase, 1 uppercase, 1 number, 1 symbol 
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol.'
            }), 

*/