import Specialization from "../models/specializationModel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getSpecializations = async ( req, res, next ) => {
    try {
        const specializations = await Specialization.find();

        return next( CreateSuccess( 200, "All Specializations", specializations ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const getSpecializationById = async ( req, res, next ) => {
    try {
        const specialization = await Specialization.findById( req.params.id );

        if ( !specialization ) return next( CreateError( 404, "Specialization not found!" ) );

        return next( CreateSuccess( 200, "Specialization Data", specialization ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const createSpecialization = async ( req, res, next ) => {
    try {
        const newSpecializationData = req.body;

        // Perform data validation

        const newSpecialization = new Specialization( newSpecializationData );
        await newSpecialization.save();

        return next( CreateSuccess( 201, "Specialization Created!", newSpecialization ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};