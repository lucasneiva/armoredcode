import { createError } from "./error.js";

export const handleValidationError = ( error, next ) => {
    if (error.name === 'MongoServerError' && error.code === 11000) {
        // Extract the duplicate key field from the error message
        const duplicateKeyField = Object.keys(error.keyValue)[0];
        
        // Create a custom error message
        const errorMessage = {
            [duplicateKeyField]: `${duplicateKeyField} already exists`
        };

        return next(createError(400, errorMessage));
    }
    
    if ( error.name === 'ValidationError' ) {
        const errors = {};
        Object.keys( error.errors ).forEach( ( key ) => {
            errors[ key ] = error.errors[ key ].message;
        } );
        return next( createError( 400, errors ) );
    }

    return next( createError( 500, 'Internal Server Error' ) );
};