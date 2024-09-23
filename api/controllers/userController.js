import { createError } from "../utils/error.js"
import User from "../models/userModel.js"
import { createSuccess } from "../utils/success.js";



export const getAllUsers = async ( req, res, next ) => {
    try {
        const users = await User.find();
        return next( createSuccess( 200, "All users", users ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );
    }
}

export const getById = async ( req, res, next ) => {
    try {
        const user = await User.findById( req.params.id );

        if ( !user )
            return next( createError( 404, "User not found!" ) );

        return next( createSuccess( 200, "User Data", user ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );

    }

}

//fetching user role
export const getUserRole = async (req, res, next) => {
    try {
      const userId = req.params.id;
  
      const user = await User.findById(userId, 'role'); // Only fetch the 'role' field
  
      if (!user) {
        return next(createError(404, "User not found!"));
      }
  
      return next(createSuccess(200, "User Role", { role: user.role }));
  
    } catch (error) {
      return next(createError(500, "Internal Server Error!"));
    }
  };

export const updateUser = async ( req, res, next ) => {
    try {
        const userId = req.params.id;
        const updateData = req.body;

        // Validate updateData using Joi

        const user = await User.findById( userId );
        if ( !user ) {
            return next( createError( 404, "User not found!" ) );
        }

        user.username = updateData.username || user.username;
        user.email = updateData.email || user.email;
        
        await user.save();

        return next( createSuccess( 200, "User updated successfully!", user ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );
    }
};

export const deleteUser = async ( req, res, next ) => {
    
};