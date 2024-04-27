import Job from "../models/Job.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import mongoose from "mongoose";
import jobJoiSchema from "../validators/jobValidator.js";
import { validateData } from "../utils/validateData.js";

export const getAllJobs = ( req, res, next ) => {

};

export const getJobById = ( req, res, next ) => {

};

export const postJob = async ( req, res, next ) => {
    try {
        const newJobData = req.body;

        try {
            await validateData( jobJoiSchema, newJobData );
        } catch ( error ) {
            return next( CreateError( "400", error.message ));
        }

        const newJob = new Job( newJobData );

        await newJob.save();

        return next( CreateSuccess( 200, "Job Posted!" ) );

    } catch ( error ) {
        console.error( error );
        return next( CreateError( 500, "Internal Server Error!" ) );
    }

};

