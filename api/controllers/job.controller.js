import Job from "../models/Job.js"
import { CreateError } from "../utils/error.js"
import { CreateSuccess } from "../utils/success.js";
import mongoose from "mongoose";
import Joi from 'joi';

const ObjectId = mongoose.Types.ObjectId;

const objectIdValidation = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const getAllJobs = ( req, res, next ) => {

};

export const getJobById = ( req, res, next ) => {

};

export const postJob = async ( req, res, next ) => {
    try {
        // 1. Authentication & Authorization
        // Check if the user is authenticated and authorized to create jobs
        // If not authorized, return an error response (e.g., 401 Unauthorized)
        // ... 

        // 2. Get Job Data from Request Body
        const newJobData = req.body;

        // 3. Data Validation
        const jobSchema = Joi.object( {
            clientId: Joi.string().required().custom(objectIdValidation, 'ObjectId Validation'),
            jobCategory: Joi.object( {
                categoryId: Joi.string().required().custom(objectIdValidation, 'ObjectId Validation'),
                categoryName: Joi.string().required(),
            } ).required(),
            jobTitle: Joi.string().required(),
            jobDescription: Joi.string().required(),
        } );

        const validationResult = jobSchema.validate( newJobData );

        if ( validationResult.error ) {
            return res.status( 400 ).json( {
                error: validationResult.error.message
            } );
        }

        // 4. Create New Job Document
        const newJob = new Job(newJobData);

        // 5. Save to Database
        await newJob.save();

        // 6. Send Response
        res.status( 201 ).json( newJob ); // trocar dps

    } catch ( error ) {
        console.error( error );
        res.status( 500 ).json( { message: "Error creating job" } );
    }

};

