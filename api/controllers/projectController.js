import project from "../models/projectModel.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import { validateData } from "../utils/validateData.js";
import { connectToDatabase } from "../db.js";

export const searchProjects = async ( req, res, next ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection( 'projects' );

        const searchTerm = req.query.q; // Get search term from query parameter

        const results = await collection.aggregate( [
            {
                $search: {
                    index: 'projects', // Replace 'default' with your index name if needed
                    text: {
                        query: searchTerm,
                        path: [ 'projectTitle', 'projectDescription' ] // Fields to search
                    }
                }
            }
        ] ).toArray();

        return next( CreateSuccess( 200, 'Search Results', results ) );

    } catch ( error ) {
        return next( CreateError( 500, 'Internal Server Error' ) );
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

        /*
        try {
            await validateData( projectJoiSchema, newprojectData );
        } catch ( error ) {
            return next( CreateError( "400", error.message ));
        }
        */

        const newproject = new project( newProjectData );

        await newproject.save();

        return next( CreateSuccess( 200, "Project Created!" ) );

    } catch ( error ) {
        console.error( error );
        return next( CreateError( 500, "Internal Server Error!" ) );
    }

};
