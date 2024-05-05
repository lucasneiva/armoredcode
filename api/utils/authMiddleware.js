import jwt from 'jsonwebtoken';
import { CreateError } from './error.js';

export const verifyToken = ( req, res, next ) => {
    const token = req.cookies.acess_token;

    if ( !token )
        return next( CreateError( 401, "Not Authenticated!" ) );

    jwt.verify( token, process.env.JWT_SECRET, ( err, user ) => {
        if ( err )
            return next( CreateError( 403, "Invalid Token!" ) );

        req.user = user;
        next();

    } );

}

export const verifyUser = ( req, res, next ) => {
    verifyToken( req, res, () => {
        if ( req.user.id === req.params.id ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized!" ) );

        }

    } );

};

export const verifyClient = ( req, res, next ) => {
    verifyToken( req, res, () => {
        if ( req.user.role === "CLIENT" ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized As Client!" ) );

        }

    } );

};

export const verifyFreelancer = ( req, res, next ) => {
    verifyToken( req, res, () => {
        if ( req.user.role === "FREELANCER" ) {
            next();

        } else {
            return next( CreateError( 403, "Not Authorized As Freelancer!" ) );

        }

    } );

};