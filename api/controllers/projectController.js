import project from "../models/projectModel.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import projectJoiSchema from "../validators/projectValidator.js";
import { validateData } from "../utils/validateData.js";

export const getAllprojects = ( req, res, next ) => {

};

export const getProjectById = ( req, res, next ) => {

};

export const createProject = async ( req, res, next ) => {
    try {
        const token = req.cookies.acess_token;
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        const newProjectData = req.body;
        
        newProjectData.clientId = decodedToken.id; 

        if ( decodedToken.id != newProjectData.clientId )
            return next ( CreateError(400, "Not Authorizead!"));

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

