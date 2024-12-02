import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";
import { connectToDatabase } from "../db.js";
import mongoose from "mongoose";
import { handleValidationError } from "../utils/handleValidationError.js";

export const searchFreelancers = async ( req, res, next ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection( 'freelancerprofiles' );

        const searchTerm = req.query.q;
        const skillIds = req.query.skillIds;
        const experienceLevel = req.query.experienceLevel;
        const specializationId = req.query.specializationId;

        // 1. Build the Search Stage (if searchTerm is provided)
        const searchStage = searchTerm ? {
            $search: {
                index: 'freelancers',
                text: {
                    query: searchTerm,
                    path: [ 'firstName', 'lastName', 'profileSummary' ]
                }
            }
            
        } : {};

        // 2. Build the Match Stage for filters
        const matchStage = {
            $match: {}
        };

        if ( skillIds && skillIds.length > 0 ) {
            matchStage.$match.skillIds = { $all: skillIds.map( id => new mongoose.Types.ObjectId( id ) ) };
        }

        if ( experienceLevel ) {
            matchStage.$match.experienceLevel = experienceLevel;
        }

        if ( specializationId ) {
            matchStage.$match.specializationId = new mongoose.Types.ObjectId( specializationId );
        }

        // 3. Construct the Aggregation Pipeline
        const aggregationPipeline = [];
        if ( searchTerm ) {
            aggregationPipeline.push( searchStage );
        }
        aggregationPipeline.push( matchStage );

        // 4. Execute the Aggregation
        const results = await collection.aggregate( aggregationPipeline ).toArray();

        return next( createSuccess( 200, 'Search Results', results ) );

    } catch ( error ) {
        console.log( error );
        return next( createError( 500, 'Internal Server Error' ) );
    }
};

export const searchProjects = async (req, res, next) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection('projects');

        const searchTerm = req.query.q;
        const categoryId = req.query.category;
        const skillIds = req.query.skillIds;

        // 1. Search Stage (if searchTerm is provided)
        const searchStage = searchTerm
            ? {
                $search: {
                    index: 'projects',
                    text: {
                        query: searchTerm,
                        path: ['projectTitle', 'projectDescription'],
                    },
                },
            }
            : {};


        // 2. Match Stage (combine all filter criteria)
        const matchStage = { $match: {} };

        if (categoryId) {
            matchStage.$match.projectCategoryId = new mongoose.Types.ObjectId(categoryId);
        }

        if (skillIds && skillIds.length > 0) {
            matchStage.$match.skillIds = { $all: skillIds.map(id => new mongoose.Types.ObjectId(id)) };
        }

        matchStage.$match.projectStatus = "POSTED"; // Ensure only "POSTED" projects are returned



        // 3. Construct the Aggregation Pipeline (always include $match)
        const aggregationPipeline = [];

        if (searchTerm) {
            aggregationPipeline.push(searchStage);
        }

        aggregationPipeline.push(matchStage); // Always include the match stage


        // 4. Execute the Aggregation and Return Results
        const results = await collection.aggregate(aggregationPipeline).toArray();

        return next(createSuccess(200, 'Search Results', results));

    } catch (error) {
        console.error("Error searching projects:", error); // Improved error logging
        return next(createError(500, 'Internal Server Error'));
    }
};