import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
// import proposalRoutes from "./routes/proposalRoutes.js"; //modified
import profileRoutes from "./routes/profileRoutes.js";
import skillRoutes from "./routes/skillRoutes.js"
import projectCategoryRoutes from "./routes/projectCategoryRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import specializationRoutes from "./routes/specializationRoutes.js";
import cookieParser from "cookie-parser";

// Fixtures
import seedProjectCategories from './fixtures/projectCategoryFixture.js';
import seedIndustries from './fixtures/industryFixture.js';
import seedSpecializations from './fixtures/specializationFixture.js';
import seedSkills from './fixtures/skillFixture.js';
import seedUsers from "./fixtures/userFixture.js";
import seedFreelancerProfiles from "./fixtures/freelancerProfileFixture.js";
import seedClientProfiles from "./fixtures/clientProfileFixture.js";
import seedProjects from "./fixtures/projectFixture.js";

import { searchProjects, getProjectById, createProject } from './controllers/projectController.js';

const app = express();
dotenv.config();


app.use( express.json() );
app.use( cookieParser() );

app.use( cors( {
    origin: 'http://localhost:4200', // Your frontend origin
    credentials: true,  // Allow cookies
    /*
    allowedHeaders: [ 'Content-Type', 'Authorization' ],
    methods: [ 'GET', 'POST', 'PUT', 'DELETE' ],
    exposedHeaders: [ 'Set-Cookie' ] // Important for letting frontend access cookies
    */
} ) );

// Routes
app.use( "/api/auth", authRoutes );
app.use( "/api/users", userRoutes );
app.use( "/api/projects", projectRoutes );
//app.use( "/api/proposals", proposalRoutes ); //modified //falta controller
app.use( "/api/profiles", profileRoutes );
app.use( "/api/skills", skillRoutes );
app.use( "/api/project-categories", projectCategoryRoutes );
app.use( "/api/specializations", specializationRoutes );
app.use( "/api/industries", industryRoutes );

const connectMongoDB = async () => {
    try {
        await mongoose.connect( process.env.MONGO_URL );

    }
    catch ( error ) {
        throw error;
    }
}

//Error Handler Middleware
app.use( ( obj, req, res, next ) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something went wrong!";

    return res.status( statusCode ).json( {
        success: [ 200, 201, 204 ].some( a => a === obj.status ) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data
    } );
} );

app.listen( 8800, async () => {

    try {
        console.log( `Server started on port 8800!` );

        await connectMongoDB();

        console.log( `Connected to MongoDB database!` );

        //
        await seedProjectCategories();
        await seedIndustries();
        seedSpecializations();
        await seedSkills();

        await seedUsers();

        await seedFreelancerProfiles();
        await seedClientProfiles();

        await seedProjects(); 
        //

    } catch ( error ) {
        console.error( `Error connecting to MongoDB: ${error}` );
    }

} );

