import Job from "../models/Job.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import mongoose from "mongoose";
import jobJoiSchema from "../validators/jobValidator.js";

export const getAllJobs = ( req, res, next ) => {

};

export const getJobById = ( req, res, next ) => {

};

export const postJob = async (req, res, next) => {
    try {
        // Do Authentication & Authorization Later

        const newJobData = req.body;

        const validationResult = jobJoiSchema.validate(newJobData);

        if ( validationResult.error ) {
            return next(CreateError(400, "Bad Request!"));  
        }
        
        const newJob = new Job(newJobData);

        await newJob.save();

        return next(CreateSuccess(200, "Job Posted!"));

    } catch ( error ) {
        console.error( error );
        return next(CreateError(500, "Internal Server Error!"));    
    }

};

