import Joi from 'joi';
import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;

function objectIdValidation(value, helpers) {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
}

function generateValidator(modelSchema) {
  const joiSchema = Joi.object();

  for (const field in modelSchema.obj) {
    const fieldSchema = modelSchema.obj[field];

    // Handle different schema types
    switch (fieldSchema.type) {
      case String: // Use String directly without the function call
        joiSchema[field] = Joi.string();
        break;

      case Number:
        joiSchema[field] = Joi.number();
        break;

      case Date:
        joiSchema[field] = Joi.date();
        break;

      case Boolean:
        joiSchema[field] = Joi.boolean();
        break;

      case ObjectId:
        joiSchema[field] = Joi.string().custom(objectIdValidation, 'ObjectId Validation');
        break;

      case Array:
        // Recursively generate validator for array elements
        const elementSchema = fieldSchema.items;
        if (elementSchema) {
          joiSchema[field] = Joi.array().items(generateValidator(elementSchema));
        }
        break;

      case Enum:
        // Create an enum validator
        const enumValues = fieldSchema.enum;
        if (enumValues) {
          joiSchema[field] = Joi.string().valid(...enumValues);
        }
        break;

      case Object:
        // Handle nested objects
        joiSchema[field] = generateValidator(fieldSchema);
        break;

      default:
        // Handle other types (functions, etc.)
        if (typeof fieldSchema === 'function') {
          console.warn(`Skipping field ${field} - Not supported by Joi`);
        } else {
          console.warn(`Unhandled field type: ${fieldSchema.type}`);
        }
    }

    // Add any specific validation rules from the schema
    if (fieldSchema.required) {
      joiSchema[field] = joiSchema[field].required(); // Adding required validation here
    }

    if (fieldSchema.min) {
      joiSchema[field] = joiSchema[field].min(fieldSchema.min);
    }

    if (fieldSchema.max) {
      joiSchema[field] = joiSchema[field].max(fieldSchema.max);
    }
  }

  return joiSchema;
}

export { generateValidator };