import ProjectCategory from "../models/projectCategoryModel.js";
import { createError } from "../utils/error.js";
import { createSuccess } from "../utils/success.js";

export const getProjectCategories = async ( req, res, next ) => {
    try {
        const categories = await ProjectCategory.find();

        return next( createSuccess( 200, "All Project Categories", categories ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );
    }
};

export const getProjectCategoryById = async ( req, res, next ) => {
    try {
        const category = await ProjectCategory.findById( req.params.id );

        if ( !category ) return next( createError( 404, "Project Category not found!" ) );

        return next( createSuccess( 200, "Project Category Data", category ) );

    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );
    }
};

export const createProjectCategory = async ( req, res, next ) => {
    try {
        const newCategoryData = req.body;

        // Perform data validation here

        const newCategory = new ProjectCategory( newCategoryData );
        await newCategory.save();

        return next( createSuccess( 201, "Project Category Created!", newCategory ) );
    } catch ( error ) {
        return next( createError( 500, "Internal Server Error!" ) );
    }
}; 