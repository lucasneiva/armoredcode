import express from "express";
import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import skillRoutes from "./routes/skillRoutes.js"
import projectCategoryRoutes from "./routes/projectCategoryRoutes.js";
import industryRoutes from "./routes/industryRoutes.js";
import specializationRoutes from "./routes/industryRoutes.js";
import cookieParser from "cookie-parser";

// Fixtures
import seedProjectCategories from './fixtures/projectCategoryFixture.js';
import seedIndustries from './fixtures/industryFixture.js';
import seedSpecializations from './fixtures/specializationFixture.js';
import seedSkills from './fixtures/skillsFixture.js';
import seedUsers from "./fixtures/userFixture.js";
import seedFreelancerProfiles from "./fixtures/freelancerProfileFixture.js";

const app = express();
dotenv.config();


app.use( express.json() );
app.use( cookieParser() );
app.use( cors( {
    origin: 'http://localhost:4200',
    credentials: true
} ) );

app.use( "/api/auth", authRoutes );
app.use( "/api/users", userRoutes );
app.use( "/api/projects", projectRoutes );
app.use( "/api/profiles", profileRoutes );
app.use( "/api/skills", skillRoutes );
app.use( "/api/project-categories", projectCategoryRoutes );
app.use( "/api/industries", industryRoutes );
app.use( "/api/specializations", specializationRoutes );

const connectMongoDB = async ( next ) => {
    try {
        await mongoose.connect( process.env.MONGO_URL );

        next();
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

app.listen( 8800, () => {
    connectMongoDB( async () => {
        console.log( `Server started on port 8800!` );
        console.log( `Connected to MongoDB database!` );

        await seedProjectCategories();
        await seedIndustries();
        await seedSpecializations();
        await seedSkills();
        await seedUsers();
        await seedFreelancerProfiles();
        
    } ).catch( ( err ) => {
        console.error( `Error connecting to MongoDB: ${err}` );
    } );
} );