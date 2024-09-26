import project from "../models/projectModel.js"
import { createError } from "../utils/error.js"
import { createSuccess } from "../utils/success.js";
import jwt from 'jsonwebtoken';
import { connectToDatabase } from "../db.js";
import mongoose, { Mongoose, Schema } from "mongoose";
import { handleValidationError } from "../utils/handleValidationError.js";
// import projectJoiSchema from "../validators/projectValidator.js"

export const searchProjects = async ( req, res, next ) => {
    try {
        const db = await connectToDatabase();
        const collection = db.collection( 'projects' );

        const searchTerm = req.query.q; // Search term 
        const categoryId = req.query.category; // Category ID for filtering

        console.log( categoryId );

        // 1. Build the Search Stage
        const searchStage = {
            $search: {
                index: 'projects',
                text: {
                    query: searchTerm,
                    path: [ 'projectTitle', 'projectDescription' ]
                }
            }
        };

        // 2. Build the Match Stage (for category filtering)
        const matchStage = {};
        if ( categoryId ) {
            matchStage.$match = { projectCategoryId: new mongoose.Types.ObjectId( categoryId ) };
        }

        // 3. Construct the Aggregation Pipeline 
        const aggregationPipeline = [];
        if ( searchTerm ) {
            aggregationPipeline.push( searchStage ); // Add text search if there's a search term
        }

        if ( categoryId ) {
            aggregationPipeline.push( matchStage ); // Add category filter if a category is provided
        }

        // 4. Execute the Aggregation 
        const results = await collection.aggregate( aggregationPipeline ).toArray();

        return next( createSuccess( 200, 'Search Results', results ) );

    } catch ( error ) {
        console.log( error )
        return next( createError( 500, 'Internal Server Error' ) );
    }
};


export const getProjectById = async (req, res, next) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id; // Assumindo que o middleware de autenticação adiciona o user ao req

        const projectObjectId = new mongoose.Types.ObjectId(projectId);

        // Verificar se o projectId é um ObjectId válido
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(createError(400, "Invalid project ID"));
        }

        // Buscar o projeto
        const projectDetails = await project.findById(projectId)
            .populate('clientId', 'username email') // Popula informações básicas do cliente
            .populate('freelancerId', 'username email') // Popula informações básicas do freelancer, se atribuído
            .populate('projectCategoryId', 'name') // Popula o nome da categoria do projeto
            .populate('skillIds', 'name'); // Popula os nomes das habilidades requeridas

        // Verificar se o projeto existe
        if (!projectDetails) {
            return next(createError(404, "Project not found"));
        }

        // Verificar permissões
        // O usuário pode ver o projeto se for o cliente, o freelancer atribuído, ou se o status for "POSTED"
        if (projectDetails.clientId._id.toString() !== userId && 
            (projectDetails.freelancerId && projectDetails.freelancerId._id.toString() !== userId) && 
            projectDetails.projectStatus !== "POSTED") {
            return next(createError(403, "You don't have permission to view this project"));
        }

        // Se tudo estiver ok, retornar os detalhes do projeto
        return next(createSuccess(200, "Project details retrieved successfully", projectDetails));

} catch (error) {
        console.error("Error in getProjectById:", error);
        return next(createError(500, "Internal server error"));
    }
};
  
export const createProject = async ( req, res, next ) => {
    try {
        const token = req.cookies.acess_token;
        const decodedToken = jwt.verify( token, process.env.JWT_SECRET );

        const newProjectData = req.body;
        newProjectData.clientId = decodedToken.id;


        const newproject = new project( newProjectData );

        await newproject.save();

        return next( createSuccess( 200, "Project Created!" ) );

    } catch ( error ) {
        handleValidationError( error, next );
    }

};

export const getUserProjects = async ( req, res, next ) => {
    try {
        const userId = req.user.id;
        const userObjId = new mongoose.Types.ObjectId(userId);

        const projects = await project.find( {clientId: userObjId}, 'projectTitle projectStatus _id');

        return next( createSuccess( 200, 'User Projects', projects ) );

    } catch ( error ) {
        // Handle other potential errors 

        console.log(error);
        return next( createError( 500, 'Internal Server Error' ) );

    }
};

export const updateProject = async ( req, res, next ) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id; // Assuming authentication middleware adds user to req
        const updateData = req.body; // Data to update the project with
    
        // 1. Validation
        //    - Validate projectId (ensure it's a valid ObjectId)
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
          return next(createError(400, "Invalid project ID"));
        }
    
        //    - Validate updateData (optional but recommended):
        //      - Use a validation library like Joi to ensure data types and formats 
        //        are correct and prevent unexpected data from being saved to your database.
        //      - Example:
        //        const { error } = projectJoiSchema.validate(updateData);
        //        if (error) {
        //          return next(createError(400, error.details[0].message)); 
        //        } 
    
        // 2. Fetch the project
        const existingProject = await project.findById(projectId);
    
        if (!existingProject) {
          return next(createError(404, "Project not found"));
        }
    
        // 5. Update the project
        //    - Option 1: Direct update (less verbose but less control):
        Object.assign(existingProject, updateData);
        await existingProject.save();
    
        // Return the updated project
        return next(createSuccess(200, "Project updated successfully", existingProject));
    
      } catch (error) {
        console.error("Error in updateProject:", error);
        return next(createError(500, "Internal server error"));
      }
}

export const deleteProject = async ( req, res, next ) => {
    try {
        const projectId = req.params.id;
        const userId = req.user.id; // Assuming you have middleware to get the logged-in user
        
        // Check if the project ID is valid
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(createError(400, "Invalid project ID"));
        }

        // Find the project and ensure the user is the owner (clientId)
        const projectToDelete = await project.findOne({ _id: projectId, clientId: userId });

        if (!projectToDelete) {
          return next(createError(404, "Project not found or you don't have permission to delete it"));
        }

        // Delete the project
        await projectToDelete.deleteOne(); 
        return next(createSuccess(200, "Project deleted successfully"));
        } catch (error) {
            console.error("Error in deleteProject:", error);
            return next(createError(500, "Internal server error"));
        }
}

export const getAllProjects = async (req, res, next) => {
    try {
        // Fetch all projects, optionally with pagination or filtering if needed
        const allProjects = await project.find()
            .populate('clientId', 'username email')
            .populate('freelancerId', 'username email')
            .populate('projectCategoryId', 'name')
            .populate('skillIds', 'name');

        return next(createSuccess(200, "All projects retrieved successfully", allProjects));
    } catch (error) {
        console.error("Error in updateProject:", error);
        return next(createError(500, "Internal server error"));
    }
}