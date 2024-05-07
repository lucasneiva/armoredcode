import project from "../models/projectModel.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import mongoose from "mongoose";
import projectJoiSchema from "../validators/projectValidator.js";
import { validateData } from "../utils/validateData.js";

export const getAllprojects = ( req, res, next ) => {

};

export const getProjectById = ( req, res, next ) => {

};

export const postProject = async ( req, res, next ) => {
    try {
        const newprojectData = req.body;

        try {
            await validateData( projectJoiSchema, newprojectData );
        } catch ( error ) {
            return next( CreateError( "400", error.message ));
        }

        const newproject = new project( newprojectData );

        await newproject.save();

        return next( CreateSuccess( 200, "project Posted!" ) );

    } catch ( error ) {
        console.error( error );
        return next( CreateError( 500, "Internal Server Error!" ) );
    }

};
