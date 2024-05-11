import ClientProfile from "../models/clientProfileModel.js";
import FreelancerProfile from "../models/freelancerProfileModel.js";
import User from "../models/userModel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const createProfile = async ( req, res, next ) => {
    const userId = req.user.id;
    const role = req.user.role;
    const profileData = req.body;

    try {
        const existingProfile = await User.findById( userId, { profile: 1 } );

        if ( existingProfile.profileId ) {
            return next( CreateError( 400, "You already have a profile!" ) );

        }

        let profile;

        if ( role === "CLIENT" ) {
            profile = new ClientProfile( profileData );

        } else if ( role === "FREELANCER" ) {
            profile = new FreelancerProfile( profileData );

        } else {
            return next( CreateError( 400, "Invalid role" ) );

        }

        await profile.save();

        await User.findByIdAndUpdate( userId, { profile: profile._id } );

        return next( CreateSuccess( 200, "Profile created successfully!" ) );

    } catch ( error ) {
        return next( CreateError( 500, "Error creating profile" ) );

    }
};

export const getProfileById = async ( req, res, next) => {
    
}