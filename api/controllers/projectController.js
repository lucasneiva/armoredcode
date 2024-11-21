import project from "../models/projectModel.js"
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../db.js";
import mongoose, { Mongoose, Schema } from "mongoose";
import { handleValidationError } from "../utils/handleValidationError.js";

export const getProjectById = async ( req, res, next ) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        const projectObjectId = new mongoose.Types.ObjectId( projectId );

        if ( !mongoose.Types.ObjectId.isValid( projectId ) ) {
            return next( createError( 400, "Invalid project ID" ) );
        }

        const projectDetails = await project.findById( projectId )
            .populate( 'clientId', 'username email' )
            .populate( 'freelancerId', 'username email' )
            .populate( 'projectCategoryId', 'name' )
            .populate( 'skillIds', 'name' );

        if ( !projectDetails ) {
            return next( createError( 404, "Project not found" ) );
        }

        if ( projectDetails.clientId._id.toString() !== userId &&
            ( projectDetails.freelancerId && projectDetails.freelancerId._id.toString() !== userId ) &&
            projectDetails.projectStatus !== "POSTED" ) {
            return next( createError( 403, "You don't have permission to view this project" ) );
        }

        return next(createSuccess(200, "Project details retrieved successfully", { ...projectDetails.toObject(), createdAt: projectDetails.createdAt })); // Include createdAt in the response
    } catch ( error ) {
        console.error( "Error in getProjectById:", error );
        return next( createError( 500, "Internal server error" ) );
    }
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

export const updateProject = async ( req, res, next ) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;
        const updateData = req.body;

        if ( !mongoose.Types.ObjectId.isValid( projectId ) ) {
            return next( createError( 400, "Invalid project ID" ) );
        }

        const existingProject = await project.findById( projectId );

        if ( !existingProject ) {
            return next( createError( 404, "Project not found" ) );
        }

        Object.assign( existingProject, updateData );
        await existingProject.save();

        return next( createSuccess( 200, "Project updated successfully", existingProject ) );

    } catch ( error ) {
        console.error( "Error in updateProject:", error );
        return next( createError( 500, "Internal server error" ) );
    }
}

export const deleteProject = async ( req, res, next ) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id;

        if ( !mongoose.Types.ObjectId.isValid( projectId ) ) {
            return next( createError( 400, "Invalid project ID" ) );
        }

        const projectToDelete = await project.findOne( { _id: projectId, clientId: userId } );

        if ( !projectToDelete ) {
            return next( createError( 404, "Project not found or you don't have permission to delete it" ) );
        }

        await projectToDelete.deleteOne();
        return next( createSuccess( 200, "Project deleted successfully" ) );
    } catch ( error ) {
        console.error( "Error in deleteProject:", error );
        return next( createError( 500, "Internal server error" ) );
    }
}

export const getUserProjects = async ( req, res, next ) => {
    try {
        const userId = req.user.id;
        const userObjId = new mongoose.Types.ObjectId( userId );

        const projects = await project.find( {
            $or: [
                { clientId: userObjId },
                { freelancerId: userObjId }
            ]
        }, 'projectTitle projectStatus _id' );

        return next( createSuccess( 200, 'User Projects', projects ) );

    } catch ( error ) {

        console.log( error );
        return next( createError( 500, 'Internal Server Error' ) );

    }
};

export const getPostedProjects = async ( req, res, next ) => {
    try {
        const allProjects = await project.find( { projectStatus: "POSTED" } )
            .populate( 'clientId', 'username email' )
            .populate( 'freelancerId', 'username email' )
            .populate( 'projectCategoryId', 'name' )
            .populate( 'skillIds', 'name' );

        return next( createSuccess( 200, "All projects retrieved successfully", allProjects ) );
    } catch ( error ) {
        console.error( "Error in updateProject:", error );
        return next( createError( 500, "Internal server error" ) );
    }
}

//new route
export const getPostedUserProjects = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const userObjId = new mongoose.Types.ObjectId(userId);

        const projects = await project.find({
            $and: [
                {
                    $or: [
                        { clientId: userObjId },
                        { freelancerId: userObjId }
                    ]
                },
                { projectStatus: "POSTED" }
            ]
        }, 'projectTitle projectStatus _id');

        return next(createSuccess(200, 'User Posted Projects', projects));

    } catch (error) {
        console.log(error);
        return next(createError(500, 'Internal Server Error'));
    }
};