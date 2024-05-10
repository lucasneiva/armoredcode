import Industry from "../models/industryModel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getIndustries = async ( req, res, next ) => {
    try {
        const industries = await Industry.find();

        return next( CreateSuccess( 200, "All Industries", industries ) );
    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const getIndustryById = async ( req, res, next ) => {
    try {
        const industry = await Industry.findById( req.params.id );

        if ( !industry ) return next( CreateError( 404, "Industry not found!" ) );

        return next( CreateSuccess( 200, "Industry Data", industry ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const createIndustry = async ( req, res, next ) => {
    try {
        const newIndustryData = req.body;

        // Perform data validation here

        const newIndustry = new Industry( newIndustryData );
        await newIndustry.save();

        return next( CreateSuccess( 201, "Industry Created!", newIndustry ) );
    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};