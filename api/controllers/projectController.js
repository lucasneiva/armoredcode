import project from "../models/projectModel.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
import projectJoiSchema from "../validators/projectValidator.js";
import { validateData } from "../utils/validateData.js";
import { connectToDatabase } from "../db.js";

export const searchProjects = async ( req, res, next ) => {
    console.log("teste");
    try {
        console.log("1");
        const db = await connectToDatabase(); // Get the db instance
        console.log("4"); 
        res.status(200).json({ message: "Database connection successful!" });
        return db; // Return the db instance
    } catch (error) {
        res.status(500).json({ error: "Database connection failed!" });
    }
    
};

export const getProjectById = async ( req, res, next ) => {
    
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
