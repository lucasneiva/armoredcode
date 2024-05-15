import ClientProfile from "../models/clientProfileModel.js";
import FreelancerProfile from "../models/freelancerProfileModel.js";
import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const createProfile = async ( req, res, next ) => {
    const userId = req.user.id;
    const role = req.user.role;
    const profileData = req.body;
    
    profileData.userId = userId;

    try {
        
        
        let profile;

        
        if ( role === "CLIENT" ) {
            const existingProfile = await ClientProfile.findOne( { userId: userId } );
            
            if ( existingProfile )
                return next( createError( 400, "User has a profile already!" ) );


            profile = new ClientProfile( profileData );

        } else if ( role === "FREELANCER" ) {
            const existingProfile = await FreelancerProfile.findOne( { userId: userId } );

            if ( existingProfile )
                return next( createError( 400, "User has a profile already!" ) );
            
            
            profile = new FreelancerProfile( profileData );

        } else {
            return next( createError( 400, "Invalid role!" ) );

        }

        await profile.save();

        return next( createSuccess( 200, "Profile created successfully!" ) );

    } catch ( error ) {
        return next( createError( 500, "Error creating profile", error ) );

    }
};

export const getProfileById = async ( req, res, next) => {
    
}