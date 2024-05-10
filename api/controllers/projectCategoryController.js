import ProjectCategory from "../models/projectCategoryModel.js";
import { CreateError } from "../utils/error.js";
import { CreateSuccess } from "../utils/success.js";

export const getProjectCategories = async ( req, res, next ) => {
    try {
        const categories = await ProjectCategory.find();

        return next( CreateSuccess( 200, "All Project Categories", categories ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const getProjectCategoryById = async ( req, res, next ) => {
    try {
        const category = await ProjectCategory.findById( req.params.id );

        if ( !category ) return next( CreateError( 404, "Project Category not found!" ) );

        return next( CreateSuccess( 200, "Project Category Data", category ) );

    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
};

export const createProjectCategory = async ( req, res, next ) => {
    try {
        const newCategoryData = req.body;

        // Perform data validation here

        const newCategory = new ProjectCategory( newCategoryData );
        await newCategory.save();

        return next( CreateSuccess( 201, "Project Category Created!", newCategory ) );
    } catch ( error ) {
        return next( CreateError( 500, "Internal Server Error!" ) );
    }
}; 