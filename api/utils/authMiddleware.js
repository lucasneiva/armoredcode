import jwt from 'jsonwebtoken';
import { CreateError } from './error.js';

export const verifyToken = ( req, res, next ) => {

    const token = req.cookies.acess_token;
    console.log(token);
    if ( !token ) {
        try {
            return next( CreateError( 401, "Not Authenticated!" ) );
        } catch ( err ) {
            console.error( err );
            res.status( 401 ).send( { message: "Not Authenticated!" } );
        }
    }

    jwt.verify( token, process.env.JWT_SECRET, ( err, user ) => {
        if ( err )
            return next( CreateError( 403, "Invalid Token!" ) );
        
        console.log( "here" );
        req.user = user;
        next();

    } );

}

export const verifyUser = ( req, res, next ) => {
    verifyToken( req, res, ( err ) => {
        if ( err )
            return next( err );
        if ( req.user.id === req.params.id ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized!" ) );

        }

    } );

};

export const verifyClient = ( req, res, next ) => {
    verifyToken( req, res, ( err ) => {
        if ( err )
            return next( err );

        if ( req.user.role === "CLIENT" ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized As Client!" ) );

        }

    } );

};

export const verifyFreelancer = ( req, res, next ) => {
    verifyToken( req, res, ( err ) => {
        if ( err )
            return next( err );
        if ( req.user.role === "FREELANCER" ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized As Freelancer!" ) );

        }

    } );

};