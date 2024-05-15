import { createError } from "./error.js";

export const handleValidationError = ( error, next ) => {
    if ( error.name === 'ValidationError' ) {
        const errors = {};
        Object.keys( error.errors ).forEach( ( key ) => {
            errors[ key ] = error.errors[ key ].message;
        } );
        return next( createError( 400, errors ) );
    }

    return next( createError( 500, 'Internal Server Error' ) );
};