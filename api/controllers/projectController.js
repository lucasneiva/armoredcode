import project from "../models/projectModel.js"
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../db.js";
import mongoose from "mongoose";
import { handleValidationError } from "../utils/handleValidationError.js";
// import projectJoiSchema from "../validators/projectValidator.js"

export const searchProjects = async ( req, res, next ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection( 'projects' );

        const searchTerm = req.query.q; // Search term 
        const categoryId = req.query.category; // Category ID for filtering

        console.log(categoryId);

        // 1. Build the Search Stage
        const searchStage = {
            $search: {
                index: 'projects',
                text: {
                    query: searchTerm,
                    path: [ 'projectTitle', 'projectDescription' ]
                }
            }
        };

        // 2. Build the Match Stage (for category filtering)
        const matchStage = {};
        if ( categoryId ) {
            matchStage.$match = { projectCategoryId: new mongoose.Types.ObjectId( categoryId ) };
        }

        // 3. Construct the Aggregation Pipeline 
        const aggregationPipeline = [];
        if ( searchTerm ) {
            aggregationPipeline.push( searchStage ); // Add text search if there's a search term
        }

        if ( categoryId ) {
            aggregationPipeline.push( matchStage ); // Add category filter if a category is provided
        }

        // 4. Execute the Aggregation 
        const results = await collection.aggregate( aggregationPipeline ).toArray();

        return next( createSuccess( 200, 'Search Results', results ) );

    } catch ( error ) {
        console.log(error)
        return next( createError( 500, 'Internal Server Error' ) );
    }
};

export const getProjectById = async ( req, res, next ) => {

};

export const createProject = async ( req, res, next ) => {
    try {
        const token = req.cookies.acess_token;
        const decodedToken = jwt.verify( token, process.env.JWT_SECRET );

        const newProjectData = req.body;
        newProjectData.clientId = decodedToken.id;


        const newproject = new project( newProjectData );

        await newproject.save();

        return next( createSuccess( 200, "Project Created!" ) );

    } catch ( error ) {
        handleValidationError( error, next );
    }

};
