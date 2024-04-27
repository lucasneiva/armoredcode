export const validateData = async (schema, data) => { 
    try {
      const validationResult = schema.validate(data, { abortEarly: false }); // Show all errors
      // console.log("Validation result:", validationResult);
 
      if (validationResult.error) {
        const errorDetails = validationResult.error.details;
        const errorMessages = errorDetails.map(detail => detail.message);
        throw new Error(errorMessages.join(', '));
      }
 
      // console.log("Validation successful");
      return; 
    } catch (error) {
      // console.error("Error in validation:", error);
      throw error; 
    }
 }; 
 