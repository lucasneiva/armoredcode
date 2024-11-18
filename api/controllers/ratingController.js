import Rating from '../models/ratingModel.js';
import { createError } from '../utils/error.js';
import { createSuccess } from '../utils/success.js';

export const createRating = async ( req, res, next ) => {
    try {
        const userId = req.user.id;
        const ratingData = req.body;

        // 1. Basic Authorization (ensure evaluator is different from evaluated)
        if ( userId === ratingData.evaluatedId ) {
            return next( createError( 400, "You cannot rate yourself." ) );
        }

        // 2. Validation
        const newRating = new Rating( ratingData );
        const validationError = newRating.validateSync();
        if ( validationError ) {
            return next( createError( 400, validationError.message ) );
        }

        // 3. Save the rating
        await newRating.save();

        return next( createSuccess( 201, "Rating created successfully" ) );
    } catch ( error ) {
        console.error( "Error in createRating:", error );
        return next( createError( 500, "Internal server error" ) );
    }
};

export const getProjectRatings = async ( req, res, next ) => {
    try {
        const projectId = req.params.projectId;

        const ratings = await Rating.find( { projectId } )
            .populate( 'evaluatorId', 'username' )
            .populate( 'evaluatedId', 'username role' );

        return next( createSuccess( 200, "Project ratings retrieved successfully", ratings ) );
    } catch ( error ) {
        console.error( "Error in getProjectRatings:", error );
        return next( createError( 500, "Internal server error" ) );
    }
};

export const checkRatingCompletion = async (req, res, next) => {
    try {
        const projectId = req.params.projectId;

        const clientRating = await Rating.findOne({ projectId, evaluatorType: 'CLIENT' });
        const freelancerRating = await Rating.findOne({ projectId, evaluatorType: 'FREELANCER' });

        if (clientRating && freelancerRating) {
            return next(createSuccess(200, "Both client and freelancer have rated the project.", { complete: true }));
        } else {
            return next(createSuccess(200, "Rating incomplete.", { complete: false }));
        }

    } catch (error) {
        console.error("Error checking rating completeness:", error);
        return next(createError(500, "Internal server error"));
    }
};
