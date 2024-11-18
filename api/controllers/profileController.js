import ClientProfile from "../models/clientProfileModel.js";
import FreelancerProfile from "../models/freelancerProfileModel.js";
import User from "../models/userModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import { handleValidationError } from "../utils/handleValidationError.js";


export const createProfile = async (req, res, next) => {
    const userId = req.user.id;
    const role = req.user.role;
    const profileData = req.body;

    profileData.userId = userId;

    try {
        let profile;

        if (role === "CLIENT") {
            const existingProfile = await ClientProfile.findOne( { userId: userId } );

            if ( existingProfile ){
                return next( createError( 400, "User has a profile already!" ) );
            }else{
                profile = new ClientProfile(profileData);
            }
                
        } else if (role === "FREELANCER") {
            const existingProfile = await FreelancerProfile.findOne( { userId: userId } );
            
            if ( existingProfile ){
                return next( createError( 400, "User has a profile already!" ) );
            }else{
                profile = new FreelancerProfile(profileData);
            }
           
        } else {
            return next(createError(400, "Invalid role!"));
        }

        await profile.save();
        return next(createSuccess(200, "Profile created successfully!", profile));

    } catch (error) {
        handleValidationError( error, next );

    }
};

export const getProfileByUserId = async (req, res, next) => {
    const { id } = req.params;

    try {
        // Find the user 
        const user = await User.findById(id);
        if (!user) {
            return next(createError(404, "User not found!"));
        }

        let profile;
        let hasProfile = false; // Flag to indicate if profile exists

        if (user.role === "CLIENT") {
            profile = await ClientProfile.findOne({ userId: user._id }).populate("userId", "firstName lastName email");
        } else if (user.role === "FREELANCER") {
            profile = await FreelancerProfile.findOne({ userId: user._id }).populate("userId", "firstName lastName email");
        } else {
            return next(createError(400, "Invalid user role!"));
        }
        
        // Check if a profile was found
        if (profile) {
            hasProfile = true; 
        }

        return next(createSuccess(200, "Profile fetch status:", { hasProfile, profile } ));

    } catch (error) {
        console.error("Error fetching profile:", error);
        return next(createError(500, "Error fetching profile", error));
    }
};

export const updateProfile = async ( req, res, next ) => {
    const userId = req.user.id;
    const role = req.user.role;
    const profileData = req.body;

    try {
        let updatedProfile;

        if ( role === "CLIENT" ) {
            updatedProfile = await ClientProfile.findOneAndUpdate( { userId: userId }, profileData, {
                new: true, // Return the updated document
                runValidators: true, // Run validation rules on the update
            } );
        } else if ( role === "FREELANCER" ) {
            updatedProfile = await FreelancerProfile.findOneAndUpdate( { userId: userId }, profileData, {
                new: true,
                runValidators: true,
            } );
        } else {
            return next( createError( 400, "Invalid role!" ) );
        }

        if ( !updatedProfile ) {
            return next( createError( 404, "Profile not found!" ) );
        }

        if ( profileData.firstName || profileData.lastName ) {
            await User.findByIdAndUpdate( userId, {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
            } );
        }

        return next( createSuccess( 200, "Profile updated successfully!", updatedProfile ) );
    } catch ( error ) {
        return next( createError( 500, "Error updating profile", error ) );
    }
};

export const deleteProfile = async (req, res, next) => {
    const userId = req.user.id;
    const role = req.user.role;

    try {
        let deletedProfile;

        if (role === "CLIENT") {
            deletedProfile = await ClientProfile.findOneAndDelete({ userId: userId });
        } else if (role === "FREELANCER") {
            deletedProfile = await FreelancerProfile.findOneAndDelete({ userId: userId });
        } else {
            return next(createError(400, "Invalid role!"));
        }

        if (!deletedProfile) {
            return next(createError(404, "Profile not found!"));
        }

        // You might also want to delete the associated user account here if needed:
        // await User.findByIdAndDelete(userId);

        return next(createSuccess(200, "Profile deleted successfully!"));
    } catch (error) {
        return next(createError(500, "Error deleting profile", error));
    }
}

export const getAllFreelancerProfiles = async (req, res, next) => {
    try {
        const freelancerProfiles = await FreelancerProfile.find().populate("userId", "firstName lastName email"); // Populate user data if needed
        return next(createSuccess(200, "Freelancer profiles fetched successfully", freelancerProfiles));
    } catch (error) {
        console.error("Error fetching freelancer profiles:", error);
        return next(createError(500, "Error fetching freelancer profiles", error));
    }
};

export const getUserRatings = async (req, res, next) => {
    try {
        const userId = req.params.userId; // Get userId from request parameters

        // 1. Find the user to check their role
        const user = await User.findById(userId);
        if (!user) {
            return next(createError(404, "User not found"));
        }

        // 2. Find the user's profile (needed to get ratings efficiently)
        let profile;
        if (user.role === "CLIENT") {
            profile = await ClientProfile.findOne({ userId: userId });
        } else if (user.role === "FREELANCER") {
            profile = await FreelancerProfile.findOne({ userId: userId });
        }

        if (!profile) {
            return next(createError(404, "User profile not found")); // Handle missing profile
        }

        // 3. Query ratings based on profile IDs (most efficient)

        let ratingsReceived;
        let ratingsGiven;

        if (user.role === "CLIENT") {
            ratingsReceived = await Rating.find({ clientProfileId: profile._id, evaluatorType: "FREELANCER" }).populate('evaluatorId', 'username').populate( 'evaluatedId', 'username role' ); // Ratings received by Client
            ratingsGiven = await Rating.find({ clientProfileId: profile._id, evaluatorType: "CLIENT"}).populate('evaluatorId', 'username').populate( 'evaluatedId', 'username role' ); // Ratings given by Client
        } else { // FREELANCER
            ratingsReceived = await Rating.find({ freelancerProfileId: profile._id, evaluatorType: "CLIENT"}).populate('evaluatorId', 'username').populate( 'evaluatedId', 'username role' ); // Ratings received by freelancer
            ratingsGiven = await Rating.find({ freelancerProfileId: profile._id, evaluatorType: "FREELANCER"}).populate('evaluatorId', 'username').populate( 'evaluatedId', 'username role' ); // Ratings given by freelancer
        }


        //4. create result object

        const allRatings = {
            received: ratingsReceived,
            given: ratingsGiven
        }


        // 5. Return the ratings
        return next(createSuccess(200, "User ratings retrieved successfully", allRatings));

    } catch (error) {
        console.error("Error retrieving user ratings:", error);
        return next(createError(500, "Error retrieving user ratings"));
    }
};