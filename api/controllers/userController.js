import { CreateError } from "../utils/error.js"
import User from "../models/userModel.js"
import { CreateSuccess } from "../utils/success.js";



export const getAllUsers = async ( req, res, next ) => {
    try {
        const users = await User.find();
        return next( CreateSuccess( 200, "All users", users ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
}

export const getById = async ( req, res, next ) => {
    try {
        const user = await User.findById( req.params.id );

        if ( !user )
            return next( CreateError( 404, "User not found!" ) );

        return next( CreateSuccess( 200, "User Data", user ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );

    }

}

export const updateUser = async ( req, res, next ) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Validate updateData using Joi

        const user = await User.findById( userId );
        if ( !user ) {
            return next( CreateError( 404, "User not found!" ) );
        }

        user.username = updateData.username || user.username;
        user.email = updateData.email || user.email;
        
        await user.save();

        return next( CreateSuccess( 200, "User updated successfully!", user ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};