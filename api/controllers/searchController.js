import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import { connectToDatabase } from "../db.js";
import mongoose from "mongoose";
import { handleValidationError } from "../utils/handleValidationError.js";
export const searchFreelancers = async ( req, res, next ) => {
 
}

export const searchProjects = async ( req, res, next ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection( 'projects' );

        const searchTerm = req.query.q;
        const categoryId = req.query.category;
        const skillIds = req.query.skillIds; // Get skill IDs from query parameter

        console.log( categoryId );

        const searchStage = {
            $search: {
                index: 'projects',
                text: {
                    query: searchTerm,
                    path: [ 'projectTitle', 'projectDescription' ]
                }
            }
        };

        const matchStage = {};
        if ( categoryId ) {
            matchStage.$match = { projectCategoryId: new mongoose.Types.ObjectId( categoryId ) };
        }

        const skillsMatchStage = {};
        if ( skillIds && skillIds.length > 0 ) {
            skillsMatchStage.$match = {
                skillIds: { $all: skillIds.map( id => new mongoose.Types.ObjectId( id ) ) }
            };
        }

        const aggregationPipeline = [];
        if ( searchTerm ) {
            aggregationPipeline.push( searchStage );
        }

        if ( categoryId ) {
            aggregationPipeline.push( matchStage );
        }

        if ( skillIds && skillIds.length > 0 ) {
            aggregationPipeline.push( skillsMatchStage );
        }

        const results = await collection.aggregate( aggregationPipeline ).toArray();

        return next( createSuccess( 200, 'Search Results', results ) );

    } catch ( error ) {
        console.log( error )
        return next( createError( 500, 'Internal Server Error' ) );
    }
};